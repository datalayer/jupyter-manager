"""Test the generation of an object configuration."""

from jupyter_server.serverapp import ServerApp

from ..generate_config import generate_config


def test_extract_traits():
    """Exract traits from a Configurable."""
    serverapp = ServerApp()
    trait_names = serverapp.trait_names()
    for trait_name in trait_names:
        try:
            trait = getattr(serverapp, trait_name)
            print(f"{trait_name}: {trait} ({type(trait)})")
        except Exception:
            print(f"{trait_name} ?")


def test_generate_config():
    """Test the generation of a configuration string."""
    serverapp = ServerApp()
    config_file = generate_config(serverapp)
    if isinstance(config_file, bytes):
        config_file = config_file.decode("utf8")
    print(config_file)
