"""Jupyter Manager handlers."""

import json

import tornado

from jupyter_server.base.handlers import APIHandler, JupyterHandler
from jupyter_server.extension.handler import ExtensionHandlerMixin, ExtensionHandlerJinjaMixin

from genson import SchemaBuilder


class BaseTemplateHandler(ExtensionHandlerJinjaMixin, ExtensionHandlerMixin, JupyterHandler):
    """The Base handler to the templates."""
    pass


class IndexHandler(BaseTemplateHandler):
    """The handler for the index."""

    @tornado.web.authenticated
    def get(self):
        """The index page."""
        self.write(self.render_template("index.html"))


class ConfigHandler(ExtensionHandlerMixin, APIHandler):
    """The config handler."""

    @tornado.web.authenticated
    def get(self):
        """Return the server configurations"""
        builder = SchemaBuilder()
        builder.add_object(self.config)
        schema = builder.to_schema()
        res = json.dumps({
            "data": "This is /jupyter_manager/get_config endpoint.",
            "config": self.config,
            "config_schema": schema,
        })
        self.finish(res)
