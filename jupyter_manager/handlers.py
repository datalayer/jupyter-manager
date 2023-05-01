import json

import tornado

from jupyter_server.base.handlers import APIHandler, JupyterHandler
from jupyter_server.extension.handler import ExtensionHandlerMixin, ExtensionHandlerJinjaMixin

from genson import SchemaBuilder


class BaseTemplateHandler(ExtensionHandlerJinjaMixin, ExtensionHandlerMixin, JupyterHandler):
    pass


class IndexHandler(BaseTemplateHandler):

    @tornado.web.authenticated
    def get(self):
        self.write(self.render_template("index.html"))


class ConfigHandler(ExtensionHandlerMixin, APIHandler):

    @tornado.web.authenticated
    def get(self):
        builder = SchemaBuilder()
        builder.add_object(self.config)
        schema = builder.to_schema()
        res = json.dumps({
            "data": "This is /jupyter_manager/get_config endpoint!",
            "config": self.config,
            "config_schema": schema,
        })
        self.finish(res)
