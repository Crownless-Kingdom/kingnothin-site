#!/usr/bin/env python3
"""Tiny static server WITH HTTP Range support (stdlib only).
`python3 -m http.server` ignores Range headers, which makes <video> seeking
unreliable. Run from the repo root:  python3 prototypes/scroll-scrub-compare/serve.py
then open http://localhost:8000/prototypes/scroll-scrub-compare/"""
import os, re, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class RangeHandler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map,
                      '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm',
                      '.js': 'text/javascript', '.ttf': 'font/ttf', '.otf': 'font/otf'}

    def send_head(self):
        rng = self.headers.get('Range')
        path = self.translate_path(self.path)
        if not rng or os.path.isdir(path) or not os.path.isfile(path):
            return super().send_head()
        m = re.match(r'bytes=(\d*)-(\d*)$', rng.strip())
        size = os.path.getsize(path)
        if not m:
            return super().send_head()
        start, end = m.group(1), m.group(2)
        if start == '':
            start, end = max(0, size - int(end)), size - 1
        else:
            start, end = int(start), (int(end) if end else size - 1)
        end = min(end, size - 1)
        if start > end or start >= size:
            self.send_response(416); self.send_header('Content-Range', f'bytes */{size}'); self.end_headers()
            return None
        f = open(path, 'rb'); f.seek(start)
        self._remaining = end - start + 1
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(self._remaining))
        self.end_headers()
        return f

    def copyfile(self, source, outputfile):
        rem = getattr(self, '_remaining', None)
        if rem is None:
            return super().copyfile(source, outputfile)
        try:
            while rem > 0:
                buf = source.read(min(65536, rem))
                if not buf: break
                outputfile.write(buf); rem -= len(buf)
        except (BrokenPipeError, ConnectionResetError):
            pass
        finally:
            self._remaining = None

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'Serving {os.getcwd()} on http://localhost:{port}/prototypes/scroll-scrub-compare/')
    ThreadingHTTPServer(('', port), RangeHandler).serve_forever()
