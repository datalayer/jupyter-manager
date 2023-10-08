"""WebSocket Relay Handler."""

from tornado.websocket import WebSocketHandler

from jupyter_server.base.handlers import JupyterHandler
from jupyter_server.base.zmqhandlers import WebSocketMixin


CONNECTED = set()


class WsRelayHandler(WebSocketMixin, WebSocketHandler, JupyterHandler):
    """WebSocket Relay Handler"""

    def open(self, *args, **kwargs):
        """WsRelayHandler open"""
        self.log.info("WsRelayHandler opened.")
        super(WebSocketMixin, self).open(*args, **kwargs)
        CONNECTED.add(self)

    def on_message(self, message):
        """WsRelayHandler on_message"""
        self.log.info("WsRelayHandler message: " + message)
        peers = {peer for peer in CONNECTED if peer is not self}
        for peer in peers:
            peer.write_message(str(message))

    def on_close(self):
        """WsRelayHandler on_close"""
        self.log.info("WsRelayHandler closed.")
        CONNECTED.remove(self)

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
