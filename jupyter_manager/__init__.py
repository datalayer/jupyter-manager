from ._version import __version__
from .application import JupyterManagerApp


def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "@datalayer/jupyter-manager"
    }]


def _jupyter_server_extension_points():
    return [{
        "module": "jupyter_manager",
        "app": JupyterManagerApp,
    }]
