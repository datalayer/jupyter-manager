"""Jupyter Manager handlers."""

import inspect

import json

import tornado

from jupyter_server.base.handlers import APIHandler, JupyterHandler
from jupyter_server.extension.handler import ExtensionHandlerMixin, ExtensionHandlerJinjaMixin

from genson import SchemaBuilder


# pylint: disable=W0223
class BaseTemplateHandler(ExtensionHandlerJinjaMixin, ExtensionHandlerMixin, JupyterHandler):
    """The Base handler for the templates."""


class IndexHandler(BaseTemplateHandler):
    """The handler for the index."""

    @tornado.web.authenticated
    def get(self):
        """The index page."""
        self.write(self.render_template("index.html"))


class ConfigHandler(ExtensionHandlerMixin, APIHandler):
    """The handler for configurations."""

    @tornado.web.authenticated
    def get(self):
        """Returns the configurations of the server extensions."""
        config = {}
        extension_apps = self.serverapp.extension_manager.extension_apps
        for extension_app_name, extension_app in extension_apps.items():
        # We assume the set() has only one entry.
            app = None
            for ea in extension_app:
                app = ea
    #       getattr(app.traits()["config_a"], "help")
    #       getattr(app, "config_a")
    #       app_config = getattr(app, "jupyter_manager_config")
    #        for trait_name in app.trait_names():
    #            trait_val = getattr(app, trait_name)
    #            conf.append(trait_val)
    #            print(trait_name, trait_val)
            try:
                app_settings = getattr(app, "settings")
                app_config = app_settings.get(f"{extension_app_name}_config", None)
                if not app_config:
                    fallback_extension_app_name = extension_app_name.replace("jupyter", "")
                    app_config = app_settings.get(f"{fallback_extension_app_name}_config", None)
                if app_config:
                    config[extension_app_name] = app_config
                    for k, v in app_config.items():
                        t = type(v)
                        if t is not str and t is not float and t is not int and t is not bool:
                            del app_config[k]
            except Exception as err:
                print(err)
        builder = SchemaBuilder()
        builder.add_object(config)
        schema = builder.to_schema()
        res = json.dumps({
            "data": "This is /jupyter_manager/get_server_config endpoint.",
            "config": config,
            "config_schema": schema,
        })
        self.finish(res)
