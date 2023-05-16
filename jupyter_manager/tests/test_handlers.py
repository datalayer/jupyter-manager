"""Test the handlers."""

import json


async def test_get_server_config(jp_fetch):
    """Test get_server_config."""
    response = await jp_fetch("jupyter_manager", "get_server_config")
    assert response.code == 200
    payload = json.loads(response.body)
    assert payload["data"] == "This is /jupyter_manager/get_server_config endpoint."
