import json

import tornado

from jupyter_server.base.handlers import APIHandler, JupyterHandler
from jupyter_server.extension.handler import ExtensionHandlerMixin, ExtensionHandlerJinjaMixin

from genson import SchemaBuilder


index = ""
try:
    f = open("index.html", "r")
except:
    pass


class JupyterManagerHandler(ExtensionHandlerMixin, APIHandler):

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


class DefaultHandler(ExtensionHandlerMixin, JupyterHandler):
    def get(self):
        self.log.info(
            "Extension Name in {} default handler: {}".format(self.name, self.name)
        )
        self.log.info(
            "Static URL for {} in jupyter manager default handler:".format(
                self.static_url(path="/")
            )
        )
        self.write("<h1>Jupyter Manager Extension</h1>")
        self.write(
            "Configuration in {} default handler: {}".format(self.name, self.config)
        )


class IndexHandler(ExtensionHandlerMixin, JupyterHandler):
    def get(self):
        self.write(index)


class BaseTemplateHandler(
    ExtensionHandlerJinjaMixin, ExtensionHandlerMixin, JupyterHandler
):
    pass


class ErrorHandler(BaseTemplateHandler):
    def get(self, path):
        self.write(self.render_template("error.html", path=path))
