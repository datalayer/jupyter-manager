
"""Shim the configurations."""

import warnings

from traitlets.config.loader import Config

from .load_config import ConfLoader


def load_config(conf_name, argv):
    """Returns a Config object based on a name."""
    conf = ConfLoader(conf_name, "", argv)
    return conf.config


def merge_configs(from_config_name=None, to_config_name=None, additional_config_name=None, argv=None):
    """Merge the notebook, server and your extension configurations and prints warnings in case
    the notebook configuration still contains NotebookApp traits.
  
        Parameters:
            from_config_name (string): the name of the notebook configuration (e.g. jupyter_notebook)
            to_config_name (string): the name of the notebook configuration (e.g. servrer_notebook)
            ext_config_name (string): the name of the notebook configuration (e.g. lab)
          
        Returns:
            Config: A configuration object with the merged value."""

    base_config = load_config(from_config_name, argv)
    to_config = load_config(to_config_name, argv)
    other_config = load_config(additional_config_name, argv)

    _print_warnings(base_config)

    merged_config = Config()
    merged_config.ServerApp = base_config.NotebookApp
    merged_config.merge(base_config)
    merged_config.merge(to_config)
    merged_config.merge(other_config)
    
    return merged_config


def _print_warnings(base_config):
    """Print warnings if the notebooik_config still contains traits."""
    deprecated = list(base_config.NotebookApp.keys())
    if deprecated:
        print("==============================================================================================")
        print("You are using settings that will be deprecated at the next major release.")
        print("Please migrate following settings from ... to ...:")
        print("  {}".format(deprecated))
        print("==============================================================================================")
        warnings.warn(
            "... configuration is deprecated. Migrate them to ...",
            DeprecationWarning, stacklevel=2,
        )
