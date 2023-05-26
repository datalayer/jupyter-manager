import { withProps } from 'react-recompose';
import { jupyterHuAPIRequest } from './hubHandler';

const withHubAPI = withProps(() => ({
  //
  // USER.
  addUser: (usernames: string[], admin: boolean) =>
    jupyterHuAPIRequest('/users', 'POST', { usernames, admin }),
  updateUser: (username: string, updated_username: string, admin: boolean) =>
    jupyterHuAPIRequest('/users/' + username, 'PATCH', {
      name: updated_username,
      admin
    }),
  getUser: (username: string) =>
    jupyterHuAPIRequest('/users/' + username + '?include_stopped_servers', 'GET').then(data => data.json()),
  validateUser: (username: string) =>
    jupyterHuAPIRequest('/users/' + username, 'GET')
      .then(data => data.status)
      .then(data => (data > 200 ? false : true)),
  getUsers: (offset: number, limit: number, name_filter: string) =>
    jupyterHuAPIRequest(
      `/users?include_stopped_servers&offset=${offset}&limit=${limit}&name_filter=${
        name_filter || ''
      }`,
      'GET'
    ).then(data => data.json()),
  refreshUsers: () => jupyterHuAPIRequest('/users', 'GET').then(data => data.json()),
  deleteUser: (username: string) =>
    jupyterHuAPIRequest('/users/' + username, 'DELETE'),
  //
  // SERVER.
  startServer: (name: string, serverName = '') =>
    jupyterHuAPIRequest('/users/' + name + '/servers/' + (serverName || ''), 'POST'),
  stopServer: (name: string, serverName = '') =>
    jupyterHuAPIRequest('/users/' + name + '/servers/' + (serverName || ''), 'DELETE'),
  startAllServers: (names: string[]) =>
    names.map((e: string) => jupyterHuAPIRequest('/users/' + e + '/server', 'POST')),
  stopAllServers: (names: string[]) =>
    names.map((e: string) => jupyterHuAPIRequest('/users/' + e + '/server', 'DELETE')),
  createGroup: (groupName: string) =>
    jupyterHuAPIRequest('/groups/' + groupName, 'POST'),
  deleteGroup: (name: string) => jupyterHuAPIRequest('/groups/' + name, 'DELETE'),
  //
  // GROUP.
  getGroup: (groupname: string) =>
    jupyterHuAPIRequest('/groups/' + groupname, 'GET').then(data => data.json()),
  updateGroups: (offset: number, limit: number) =>
    jupyterHuAPIRequest(`/groups?offset=${offset}&limit=${limit}`, 'GET').then(data =>
      data.json()
    ),
  addUserToGroup: (users: string[], groupname: string) =>
    jupyterHuAPIRequest('/groups/' + groupname + '/users', 'POST', { users }),
  removeUserFromGroup: (users: string[], groupname: string) =>
    jupyterHuAPIRequest('/groups/' + groupname + '/users', 'DELETE', { users }),
  updateGrouoProperties: (propobject: Record<string, string>, groupname: string) =>
    jupyterHuAPIRequest('/groups/' + groupname + '/properties', 'PUT', propobject),
  refreshGroupsData: () =>
    jupyterHuAPIRequest('/groups', 'GET').then(data => data.json()),
  //
  // HUB.
  shutdownHub: () => jupyterHuAPIRequest('/shutdown', 'POST'),
  //
  // NOOP.
  noop: () => {
    return null;
  },
}));

export default withHubAPI;
