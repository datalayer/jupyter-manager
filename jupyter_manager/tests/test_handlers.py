"""Test the handlers."""

import json


async def test_get_config(jp_fetch):
    """Test get_config."""
    response = await jp_fetch("jupyter_manager", "get_config")
    assert response.code == 200
    payload = json.loads(response.body)
    assert payload["data"] == "This is /jupyter_manager/get_config endpoint."
