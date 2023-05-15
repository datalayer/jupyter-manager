"""Test the loading of the configurations."""

import os

from pathlib import Path
from traitlets.config.loader import Config

from ..load_config import load_config


config_dir = Path(__file__).parent / "config_1"
os.chdir(config_dir)


def test_load_config():
    """Test the loading of a configuration."""
    config = Config()
    c_notebook = load_config("jupyter_notebook", config_dir)
    assert c_notebook.NotebookApp.port == 8889
    config.merge(c_notebook)
    assert isinstance(config, Config) is True
    notebookapp = config.NotebookApp
    assert isinstance(notebookapp, Config) is True
    assert config.NotebookApp.hello == "hello"
    config.NotebookApp2 = notebookapp
    assert config.NotebookApp2.hello == "hello"
    config['NotebookApp3'] = notebookapp
    assert config.NotebookApp3.hello == "hello"
    notebookapp2 = Config()
    notebookapp2.hello = 'hello2'
    config.NotebookApp.merge(notebookapp2)
    assert config.NotebookApp.hello == "hello2"
    notebookapp.items() # dict_items([('allow_credentials', False), ('port', 8889), ('password_required', True), ('hello', 'hello2')])
    notebookapp.keys() # dict_keys(['allow_credentials', 'port', 'password_required', 'hello'])
    notebookapp.values() # dict_values([False, 8889, True, 'hello2'])
