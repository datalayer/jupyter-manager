"""Test server extensions configurations."""

from ..server_config import get_server_extensions_configs
from ..generate_config import generate_config


def test_get_server_extensions_configs():
    """Test the retrieval of the server extensions configurations."""
    extensions = get_server_extensions_configs()
    ext_configs = {}
    for ext_name, ext_app in extensions.items():
        config = generate_config(ext_app)
        ext_configs[ext_name] = config
