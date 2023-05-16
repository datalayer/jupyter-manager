import { withProps } from 'react-recompose';
import { jhapiRequest } from './hubHandler';

const withAPI = withProps(() => ({
  updateUsers: (offset: number, limit: number, name_filter: string) =>
    jhapiRequest(
      `/users?include_stopped_servers&offset=${offset}&limit=${limit}&name_filter=${
        name_filter || ''
      }`,
      'GET'
    ).then(data => data.json()),
  updateGroups: (offset: number, limit: number) =>
    jhapiRequest(`/groups?offset=${offset}&limit=${limit}`, 'GET').then(data =>
      data.json()
    ),
  shutdownHub: () => jhapiRequest('/shutdown', 'POST'),
  startServer: (name: string, serverName = '') =>
    jhapiRequest('/users/' + name + '/servers/' + (serverName || ''), 'POST'),
  stopServer: (name: string, serverName = '') =>
    jhapiRequest('/users/' + name + '/servers/' + (serverName || ''), 'DELETE'),
  startAll: (names: string[]) =>
    names.map((e: string) => jhapiRequest('/users/' + e + '/server', 'POST')),
  stopAll: (names: string[]) =>
    names.map((e: string) => jhapiRequest('/users/' + e + '/server', 'DELETE')),
  addToGroup: (users: string[], groupname: string) =>
    jhapiRequest('/groups/' + groupname + '/users', 'POST', { users }),
  updateProp: (propobject: Record<string, string>, groupname: string) =>
    jhapiRequest('/groups/' + groupname + '/properties', 'PUT', propobject),
  removeFromGroup: (users: string[], groupname: string) =>
    jhapiRequest('/groups/' + groupname + '/users', 'DELETE', { users }),
  createGroup: (groupName: string) =>
    jhapiRequest('/groups/' + groupName, 'POST'),
  deleteGroup: (name: string) => jhapiRequest('/groups/' + name, 'DELETE'),
  UserAdds: (usernames: string[], admin: boolean) =>
    jhapiRequest('/users', 'POST', { usernames, admin }),
  UserEdit: (username: string, updated_username: string, admin: boolean) =>
    jhapiRequest('/users/' + username, 'PATCH', {
      name: updated_username,
      admin
    }),
  deleteUser: (username: string) =>
    jhapiRequest('/users/' + username, 'DELETE'),
  findGroup: (groupname: string) =>
    jhapiRequest('/groups/' + groupname, 'GET').then(data => data.json()),
  findUser: (username: string) =>
    jhapiRequest('/users/' + username, 'GET').then(data => data.json()),
  validateUser: (username: string) =>
    jhapiRequest('/users/' + username, 'GET')
      .then(data => data.status)
      .then(data => (data > 200 ? false : true)),
  noChangeEvent: () => {
    return null;
  },
  refreshGroupsData: () =>
    jhapiRequest('/groups', 'GET').then(data => data.json()),
  refreshUserData: () => jhapiRequest('/users', 'GET').then(data => data.json())
}));

export default withAPI;
