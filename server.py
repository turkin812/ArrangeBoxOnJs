import http.server
import socketserver


Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map = {'.module.js': 'module'}
httpd = socketserver.TCPServer(("", 2000), Handler)
httpd.serve_forever()
