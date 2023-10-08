"""WebSocket ping handler."""

from tornado import ioloop
from tornado.websocket import WebSocketHandler

from jupyter_server.base.handlers import JupyterHandler
from jupyter_server.base.zmqhandlers import WebSocketMixin


# pylint: disable=W0223
class WsPingHandler(WebSocketMixin, WebSocketHandler, JupyterHandler):
    """WebSocket Pong handler"""

    def open(self, *args, **kwargs):
        """open"""
        print("WebSocket opened.")
        super(WebSocketMixin, self).open(*args, **kwargs)
        loop = ioloop.IOLoop.current()
        self.last_ping = loop.time()
        self.last_pong = self.last_ping
        self.ping_callback = ioloop.PeriodicCallback(
            self.send_hello,
            1000,
        )
        self.ping_callback.start()

    def send_hello(self):
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


    def on_message(self, message):
        """on_message"""
        print("WebSocket message: " + message)
        self.write_message(str(message) + '... pong')

    def on_close(self):
        """on_close"""
        print("WebSocket closed")
