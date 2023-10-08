"""WebSocket echo handler."""

from tornado import ioloop
from tornado.websocket import WebSocketHandler

from jupyter_server.base.handlers import JupyterHandler
from jupyter_server.base.zmqhandlers import WebSocketMixin


# pylint: disable=W0223
class WsEchoHandler(WebSocketMixin, WebSocketHandler, JupyterHandler):
    """WebScoekt echo handler."""

    def _send_hello(self):
        """Send a hello."""
        if self.ws_connection is None and self.ping_callback is not None:
            self.ping_callback.stop()
            return
        if self.ws_connection.client_terminated:
            self.close()
            return
        # check for timeout on pong.  Make sure that we really have sent a recent ping in
        # case the machine with both server and client has been suspended since the last ping.
        now = ioloop.IOLoop.current().time()
        since_last_hello = 1e3 * (now - self.last_pong)
        since_last_hello = 1e3 * (now - self.last_ping)
        if since_last_hello < 2 * self.ping_interval and since_last_hello > self.ping_timeout:
            self.log.warning("WebSocket ping timeout after %i ms.", since_last_hello)
            self.close()
            return
        self.last_ping = now
        self.write_message('hello...')


    def open(self, *args, **kwargs):
        """WebSocket open"""
        self.log.info("WebSocket opened.")
        super(WebSocketMixin, self).open(*args, **kwargs)
        loop = ioloop.IOLoop.current()
        self.last_ping = loop.time()
        self.last_pong = self.last_ping
        self.ping_callback = ioloop.PeriodicCallback(
            self._send_hello,
            1000,
        )
        self.ping_callback.start()

    def on_message(self, message):
        """WebSocket on message"""
        self.log.info("WebSocket message: " + message)
        self.write_message(str(message) + '... pong')

    def on_close(self):
        """WebSocket on close"""
        self.log.info("WebSocket closed")

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
