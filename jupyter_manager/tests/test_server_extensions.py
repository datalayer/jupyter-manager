"""Test server extensions configurations."""

from ..server_extensions import get_server_extensions_config
from ..generate_config import generate_config


def test_get_server_extensions_config():
    """Test the retrieval of the server extensions configurations."""
    extensions = get_server_extensions_config()
    ext_configs = {}
    for ext_name, ext_app in extensions.items():
        config = generate_config(ext_app)
        ext_configs[ext_name] = config
