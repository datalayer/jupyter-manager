import { withProps } from 'react-recompose';
import { jupyterHubAPIRequest } from './hubHandler';

const withHubAPI = withProps(() => ({
  //
  // INFO.
  info: () =>
    jupyterHubAPIRequest('/info', 'GET')
    .then(data => data.json()),
  // USER.
  createUser: (names: string[], admin: boolean) =>
    jupyterHubAPIRequest('/users', 'POST', { names, admin }),
  getUser: (name: string) =>
    jupyterHubAPIRequest('/users/' + name + '?include_stopped_servers', 'GET').then(data => data.json()),
  updateUser: (name: string, updatedName: string, admin: boolean) =>
    jupyterHubAPIRequest('/users/' + name, 'PATCH', {
      name: updatedName,
      admin
    }),
  validateUser: (name: string) =>
    jupyterHubAPIRequest('/users/' + name, 'GET')
      .then(data => data.status)
      .then(data => (data > 200 ? false : true)),
  getUsers: (offset: number, limit: number, name_filter: string) =>
    jupyterHubAPIRequest(
      `/users?include_stopped_servers&offset=${offset}&limit=${limit}&name_filter=${
        name_filter || ''
      }`,
      'GET'
    ).then(data => data.json()),
  refreshUsers: () => jupyterHubAPIRequest('/users', 'GET').then(data => data.json()),
  deleteUser: (username: string) =>
    jupyterHubAPIRequest('/users/' + username, 'DELETE'),
  //
  // SERVER.
  startServer: (name: string, serverName = '') =>
    jupyterHubAPIRequest('/users/' + name + '/servers/' + (serverName || ''), 'POST'),
  startAllServers: (names: string[]) =>
    names.map((e: string) => jupyterHubAPIRequest('/users/' + e + '/server', 'POST')),
  stopServer: (name: string, serverName = '') =>
    jupyterHubAPIRequest('/users/' + name + '/servers/' + (serverName || ''), 'DELETE'),
  stopAllServers: (names: string[]) =>
    names.map((e: string) => jupyterHubAPIRequest('/users/' + e + '/server', 'DELETE')),
  //
  // GROUP.
  createGroup: (name: string) =>
    jupyterHubAPIRequest('/groups/' + name, 'POST'),
  getGroup: (name: string) =>
    jupyterHubAPIRequest('/groups/' + name, 'GET').then(data => data.json()),
  updateGrouo: (propobject: Record<string, string>, groupname: string) =>
    jupyterHubAPIRequest('/groups/' + groupname + '/properties', 'PUT', propobject),
  updateGroups: (offset: number, limit: number) =>
    jupyterHubAPIRequest(`/groups?offset=${offset}&limit=${limit}`, 'GET').then(data =>
      data.json()
    ),
  addUserToGroup: (users: string[], groupName: string) =>
    jupyterHubAPIRequest('/groups/' + groupName + '/users', 'POST', { users }),
  removeUserFromGroup: (users: string[], groupName: string) =>
    jupyterHubAPIRequest('/groups/' + groupName + '/users', 'DELETE', { users }),
  refreshGroups: () =>
    jupyterHubAPIRequest('/groups', 'GET').then(data => data.json()),
  deleteGroup: (name: string) => jupyterHubAPIRequest('/groups/' + name, 'DELETE'),
  //
  // SERVICE.
  getServices: () =>
    jupyterHubAPIRequest('/services', 'GET').then(data => data.json()),
  getService: (naeme: string) =>
    jupyterHubAPIRequest('/services/' + name, 'GET').then(data => data.json()),
  //
  // PROXY.
  getProxyRoutes: () =>
    jupyterHubAPIRequest('/proxy', 'GET').then(data => data.json()),
  //
  // HUB.
  shutdownHub: () => jupyterHubAPIRequest('/shutdown', 'POST'),
  //
  // NOOP.
  noop: () => {
    return null;
  },
}));

export default withHubAPI;
