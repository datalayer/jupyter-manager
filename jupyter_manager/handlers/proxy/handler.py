"""Proxy Handler."""

from tornado.ioloop import IOLoop
from tornado.websocket import WebSocketHandler, websocket_connect

from jupyter_server.base.handlers import JupyterHandler
from jupyter_server.extension.handler import ExtensionHandlerMixin
from jupyter_server.base.zmqhandlers import WebSocketMixin


# pylint: disable=W0223
class DefaultHandler(ExtensionHandlerMixin, JupyterHandler):

    def get(self):
        # The name of the extension to which this handler is linked.
        self.log.info("Extension Name in {} Default Handler: {}".format(self.name, self.name))
        # A method for getting the url to static files (prefixed with /static/<name>).
        self.log.info("Static URL for / in datalayer_rtc Default Handler:".format(self.static_url(path='/')))
        self.write('<h1>Hello Simple 1 - I am the default...</h1>')
        self.write('Config in {} Default Handler: {}'.format(self.name, self.config))


class WsProxyHandler(WebSocketMixin, WebSocketHandler, ExtensionHandlerMixin, JupyterHandler):

    ws_cnx = {}

    def ws_key(self, port, doc):
        return f'{port}-{doc}'

    async def open(self):
        port = self.get_argument('port', default=None)
        doc = self.get_argument('doc', default=None)
        ws_key = self.ws_key(port, doc)
        print(f"WebSocket Proxy {ws_key}, open")
        print(f"\nDEBUG {self.request}, {self.request.remote_ip}  \n")
        if ws_key in self.ws_cnx:
            return
        self.ws_cnx[ws_key] = await websocket_connect(f'ws://localhost:{port}/{doc}')
        async def proxy_loop():
            while True:
                msg = await self.ws_cnx[ws_key].read_message()
                if msg is None:
                    break
                # print("proxy loop msg : ", msg)
                print(f"Websocket Proxy proxy loop msg: {ws_key}")
                await self.write_message(msg, binary = True)
        IOLoop.current().spawn_callback(proxy_loop)

    def on_message(self, message,  *args, **kwargs):
        port = self.get_argument('port', default=None)
        doc = self.get_argument('doc', default=None)
        ws_key = self.ws_key(port, doc)
        print(f"WebSocket Proxy {ws_key}")
        self.ws_cnx[ws_key].write_message(message, binary = True)

    def on_close(self,  *args, **kwargs):
        port = self.get_argument('port', default=None)
        doc = self.get_argument('doc', default=None)
        ws_key = self.ws_key(port, doc)
        print(f"WebSocket Proxy {ws_key}, on close")
        if ws_key in self.ws_cnx:
            self.ws_cnx[ws_key].close()
            print(f"WebSocket Proxy {ws_key} closed")
            del self.ws_cnx[ws_key]

    # CORS
#    def check_origin(self, origin):
#        return True

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
        self.set_header("Access-Control-Allow-Credentials", "true")
        self.set_header("Access-Control-Allow-Headers", "Authorization, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, X-Requested-By, If-Modified-Since, X-File-Name, Cache-Control")

    def options(self):
        self.set_status(204)
        self.finish()
