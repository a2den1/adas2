import http.server, sys, os, functools
port = int(sys.argv[1]) if len(sys.argv) > 1 else 5880
root = os.path.dirname(os.path.abspath(__file__))
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
    def log_message(self, *a): pass
H.extensions_map.update({".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml"})
http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(H, directory=root)).serve_forever()
