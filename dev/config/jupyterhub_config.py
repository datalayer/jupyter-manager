import os

# --- JupyterHub ---
c.JupyterHub.ip = '0.0.0.0'
c.JupyterHub.port = 8000
c.JupyterHub.cookie_secret = bytes.fromhex(os.getenv('DATALAYER_JUPYTERHUB_COOKIE_SECRET', 'c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6'))
c.JupyterHub.confirm_no_ssl = False
c.JupyterHub.log_level = 'DEBUG'
c.JupyterHub.admin_access = False

def default_url(handler):
    user = handler.current_user
    if not user:
        # not logged in, send to login, no ?next
        # that way, default_url will be called again after successful login
        return handler.get_login_url()
    if "admin-ui" in handler.expanded_scopes:
        # has permission to view the admin page, send there
        return handler.base_url + "hub/admin"
    else:
        # regular user, send to spawn page
        # (which redirects to running user if it's running)
        # this is the default default URL
        return handler.base_url + "hub/spawn"

c.JupyterHub.default_url = default_url

# --- ConfigurableHTTPProxy ---
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Tornado CORS ---
c.JupyterHub.tornado_settings = {
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  }
}

# --- Cookie ---
c.JupyterHub.cookie_secret_file = '/tmp/jupyterhub_cookie_secret'

# --- Database ---
# c.JupyterHub.db_url = ':memory:'

# --- ConfigurableHTTPProxy ---
c.ConfigurableHTTPProxy.pid_file = '/tmp/jupyterhub-proxy.pid'
c.ConfigurableHTTPProxy.auth_token = os.getenv('DATALAYER_JUPYTERHUB_HTTP_PROXY_AUTH_TOKEN', 'c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')

# --- Users ---
c.Authenticator.allowed_users = {
  os.environ['USER'],
}
c.Authenticator.admin_users = {
  os.environ['USER'],
}

# --- Authenticator ---
from jupyterhub.auth import DummyAuthenticator
c.JupyterHub.authenticator_class = DummyAuthenticator
# c.DummyAuthenticator.password = "password"
# c.PAMAuthenticator.open_sessions = False

# --- Spawner ---
c.JupyterHub.spawner_class = 'jupyterhub.spawner.SimpleLocalProcessSpawner'

# jupyterhub 4.0.1 doesn't load jupyterlab automatically if Spawner.default_url is "/lab"
# https://github.com/jupyterhub/jupyterhub/issues/4510
# os.environ["JUPYTERHUB_SINGLEUSER_EXTENSION"] = "0"

c.Spawner.default_url = '/lab'
# c.Spawner.cmd = ['jupyter-labhub']
# c.LocalProcessSpawner.args = ['--ServerApp.default_url=/lab']
# c.Spawner.notebook_dir = '~/notebooks'
# c.Spawner.args = ['--debug', '--profile=PHYS131', '--ServerApp.default_url=/notebooks/Welcome.ipynb']
# c.Spawner.debug = True
# c.LocalProcessSpawner.debug = True

# --- Spawner ---
c.JupyterHub.services = [
  {
    'name': 'external-admin-service',
    'api_token': '9280326a088d3a4a058823ce1c607029e7c11be15af2cb69f32cf507a85c27e5'
  },
]

c.JupyterHub.load_roles = [
    {
        "name": "external-admin-role",
        "services": [
            "external-admin-service",
        ],
        "scopes": [
            "admin:servers",
            "admin:users",
            "admin:groups",
            "list:services",
            "proxy"
        ],
    }
]
