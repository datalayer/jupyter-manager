"""Test the shimming of the configurations."""

import os

from pathlib import Path
import pytest

from ..shim_config import merge_configs


config_dir = Path(__file__).parent / "config_2"
os.chdir(config_dir)


def test_none():
    """Test None parameters support."""
    merged = merge_configs()

    assert merged.NotebookApp is not None

    assert merged.ServerApp is not None

    assert merged.MyExt is not None


@pytest.mark.skip
def test_merge():
    """Test NotebookApp are copied to ServerApp."""
    merged = merge_configs(
        from_config_name = 'jupyter_notebook',
        to_config_name = 'jupyter_nbclassic',
        additional_config_name = 'jupyter_my_ext',
        )

    assert merged.NotebookApp.port == 8889
    assert merged.NotebookApp.allow_credentials is False
    assert merged.NotebookApp.password_required is True

    assert merged.ServerApp.port == 8889
    assert merged.ServerApp.allow_credentials is False
    assert merged.ServerApp.password_required is True

    assert merged.MyExt.hello == 'My extension'


@pytest.mark.skip
def test_merge_cli_order():
    """Test NotebookApp are copied to ServerApp 
    and CLI flags are processed."""
    merged = merge_configs(
        from_config_name = 'jupyter_notebook',
        to_config_name = 'jupyter_nbclassic',
        additional_config_name = 'jupyter_my_ext',
        argv = [
            '--NotebookApp.port=1111',
            ]
        )

    assert merged.NotebookApp.port == 1111
    assert merged.NotebookApp.allow_credentials is True
    assert merged.NotebookApp.password_required is True

    assert merged.ServerApp.port == 1111
    assert merged.ServerApp.allow_credentials is True
    assert merged.ServerApp.password_required is True

    assert merged.MyExt.hello == 'My extension'


@pytest.mark.skip
def test_merge_cli_order_2():
    """Test NotebookApp are copied to ServerApp 
    and CLI flags are processed in correct order."""
    merged = merge_configs(
        from_config_name = 'jupyter_notebook',
        to_config_name = 'jupyter_nbclassic',
        additional_config_name = 'jupyter_my_ext',
        argv = [
            '--NotebookApp.port=1111',
            '--ServerApp.port=2222',
            '--MyExt.more=True',
            ]
        )

    assert merged.NotebookApp.port == 2222
    assert merged.NotebookApp.allow_credentials is False
    assert merged.NotebookApp.password_required is True

    assert merged.ServerApp.port == 2222
    assert merged.ServerApp.allow_credentials is False
    assert merged.ServerApp.password_required is True

    assert merged.MyExt.hello == 'My extension'
    assert merged.MyExt.more is True
