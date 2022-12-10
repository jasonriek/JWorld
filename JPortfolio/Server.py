import http.server
import socketserver
from threading import Thread
import urllib.request
import urllib.parse 



class LocalServer(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.port = 1234
        self.handler = http.server.SimpleHTTPRequestHandler
    
    def run(self):
        try:
            self.startServer()
        except Exception as e:
            print(str(e))

    def startServer(self):
        try:
            with socketserver.TCPServer(("", self.port), self.handler) as server:
                print("Serving at port", self.port)
                server.serve_forever()
        
        except Exception as e:
            print(str(e))

