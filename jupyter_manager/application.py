"""Jupyter Manager Server Application
"""
import os

from traitlets import Unicode

from jupyter_server.utils import url_path_join

from jupyter_server.extension.application import ExtensionApp, ExtensionAppJinjaMixin

# import tornado

# from .handlers import IndexHandler, DefaultHandler
from .handlers import JupyterManagerHandler


DEFAULT_STATIC_FILES_PATH = os.path.join(os.path.dirname(__file__), "./")

DEFAULT_TEMPLATE_FILES_PATH = os.path.join(os.path.dirname(__file__), "./")


class JupyterManagerApp(ExtensionAppJinjaMixin, ExtensionApp):
    """Jupyter Manager application."""

    name = "jupyter_manager"

    extension_url = "/jupyter_manager/default"

    load_other_extensions = True

    static_paths = [DEFAULT_STATIC_FILES_PATH]

    template_paths = [DEFAULT_TEMPLATE_FILES_PATH]


    configA = Unicode("", config=True, help="Config A example.")

    configB = Unicode("", config=True, help="Config B example.")

    configC = Unicode("", config=True, help="Config C example.")


    def initialize_settings(self):
        self.log.info("Jupyter Manager Config {}".format(self.config))


    def initialize_handlers(self):
        """
        handler_prefix = "jupyter_manager"
        self.handlers.extend(
            [
                (r"/{}/default".format(handler_prefix), DefaultHandler),
                (r"/{}/admin/default".format(handler_prefix), JupyterManagerHandler),
                (r"/(.*).html", tornado.web.StaticFileHandler, {"path": "."}),
                (r"/(.*).js", tornado.web.StaticFileHandler, {"path": "."}),
                ("/", IndexHandler),
            ]
        )
        """
        route_pattern = url_path_join("jupyter_manager", "get_config")
        handlers = [
            (route_pattern, JupyterManagerHandler)
        ]
        self.handlers.extend(handlers)


# -----------------------------------------------------------------------------
# Main entry point
# -----------------------------------------------------------------------------

main = launch_new_instance = JupyterManagerApp.launch_instance
