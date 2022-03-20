from http.server import HTTPServer, BaseHTTPRequestHandler


class Serv(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/': # Если в запросе пустая строка после айпи и порта
            self.path = '/index.html' # По умолчанию открывается index.html
        try:
            file_to_open = open(self.path[1:]).read() # Чтение переданного через запрос файла
            self.send_response(200) # Положителньный ответ на запрос
        except:
            file_to_open = "File not found =("
            self.send_response(404) # Ошибка
        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8')) # Перекодирование файла с кодировкой UTF-8


httpd = HTTPServer(('localhost', 2000), Serv) # localhost - наш Айпи, 2000 - порт
httpd.serve_forever()