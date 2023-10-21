"""Manager handler."""

import json

import tornado

import manager

from jupyter_server.base.handlers import APIHandler
from jupyter_server.extension.handler import ExtensionHandlerMixin

from ..._version import __version__


# pylint: disable=W0223
class ManagerHandler(ExtensionHandlerMixin, APIHandler):
    """The handler for the manager images."""

    @tornado.web.authenticated
    @tornado.gen.coroutine
    def get(self):
        """Returns the manager."""
        pass
