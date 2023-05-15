"""Test extensions.
"""

from ..extensions.server_extensions import get_server_extensions


def test_get_server_extensions():
    """Test the reading of the server extensions."""
    extensions = get_server_extensions()
    print(extensions)
