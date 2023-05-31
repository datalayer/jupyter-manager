import { jupyterHubAPIRequest } from './hubHandler';

const jupyterHubApi = {
  // INFO
  info: (): Promise<Response> => jupyterHubAPIRequest('/info', 'GET'),
  // USER
  createUser: (names: string[], admin: boolean): Promise<Response> =>
    jupyterHubAPIRequest('/users', 'POST', { names, admin }),
  getUser: async (name: string): Promise<any> => {
    const res = await jupyterHubAPIRequest(
      '/users/' + name + '?include_stopped_servers',
      'GET'
    );
    if (res.status >= 400) {
      if (res.status === 404) {
        throw new Error("User doesn't exist");
      } else {
        throw new Error('Error fetching user: ' + res.statusText);
      }
    }
    const payload = await res.json();
    return payload;
  },
  addUsers: async (usernames: string[], admin: boolean): Promise<void> => {
    const res = await jupyterHubAPIRequest('/users', 'POST', {
      usernames,
      admin
    });
    if (res.status >= 400) {
      if (res.status === 409) {
        throw new Error('User already exists');
      } else {
        throw new Error('Error creating user: ' + res.statusText);
      }
    }
  },
  updateUser: async (
    name: string,
    updatedName: string,
    admin: boolean
  ): Promise<any> => {
    const res = await jupyterHubAPIRequest('/users/' + name, 'PATCH', {
      name: updatedName,
      admin
    });
    if (res.status >= 400) {
      if (res.status === 400) {
        throw new Error('Username is taken.');
      } else {
        throw new Error('Error editing user: ' + res.statusText);
      }
    }
    const payload = await res.json();
    return payload;
  },
  validateUser: (name: string): Promise<boolean> =>
    jupyterHubAPIRequest('/users/' + name, 'GET')
      .then(data => data.status)
      .then(data => (data > 200 ? false : true)),
  getUsers: async (
    offset: number,
    limit: number,
    name_filter: string
  ): Promise<any> => {
    const res = await jupyterHubAPIRequest(
      `/users?include_stopped_servers&offset=${offset}&limit=${limit}&name_filter=${
        name_filter || ''
      }`,
      'GET'
    );
    if (res.status >= 400) {
      throw new Error('Error fetching users: ' + res.statusText);
    }
    const payload = await res.json();
    return payload;
  },
  refreshUsers: async (): Promise<any> => {
    const res = await jupyterHubAPIRequest('/users', 'GET');
    if (res.status >= 400) {
      throw new Error('Error refreshing users: ' + res.statusText);
    }
    const payload = await res.json();
    return payload;
  },
  deleteUser: async (username: string): Promise<void> => {
    const res = await jupyterHubAPIRequest('/users/' + username, 'DELETE');
    if (res.status >= 400) {
      throw new Error('Error deleting user: ' + res.statusText);
    }
  },
  // SERVER
  startServer: async (name: string, serverName = ''): Promise<void> => {
    const res = await jupyterHubAPIRequest(
      '/users/' + name + '/servers/' + (serverName || ''),
      'POST'
    );
    if (res.status >= 400) {
      throw new Error('Error starting user: ' + res.statusText);
    }
  },
  startAllServers: async (names: string[]): Promise<void> => {
    const requests = names.map(e =>
      jupyterHubAPIRequest('/users/' + e + '/server', 'POST')
    );
    const res = await Promise.all(requests);
    if (res.some(response => response.status >= 400)) {
      throw new Error('Error starting servers');
    }
  },
  stopServer: async (name: string, serverName = ''): Promise<void> => {
    const res = await jupyterHubAPIRequest(
      '/users/' + name + '/servers/' + (serverName || ''),
      'DELETE'
    );
    if (res.status >= 400) {
      throw new Error('Error stopping server: ' + res.statusText);
    }
  },
  stopAllServers: async (names: string[]): Promise<void> => {
    const requests = names.map(e =>
      jupyterHubAPIRequest('/users/' + e + '/server', 'DELETE')
    );
    const res = await Promise.all(requests);
    if (res.some(response => response.status >= 400)) {
      throw new Error('Error starting servers');
    }
  },
  // GROUP
  createGroup: async (name: string): Promise<void> => {
    const res = await jupyterHubAPIRequest('/groups/' + name, 'POST');
    if (res.status >= 400) {
      if (res.status === 409) {
        throw new Error('Group already exists');
      } else {
        throw new Error('Error creating group: ' + res.statusText);
      }
    }
  },
  getGroup: async (name: string): Promise<any> => {
    const res = await jupyterHubAPIRequest('/groups/' + name, 'GET');
    if (res.status >= 400) {
      if (res.status === 404) {
        throw new Error("Group doesn't exist");
      } else {
        throw new Error('Error fetching group: ' + res.statusText);
      }
    }
    const payload = await res.json();
    return payload;
  },
  updateGroup: async (
    propobject: Record<string, string>,
    groupname: string
  ): Promise<any> => {
    const res = await jupyterHubAPIRequest(
      '/groups/' + groupname + '/properties',
      'PUT',
      propobject
    );
    if (res.status >= 400) {
      throw new Error('Error updating group properties: ' + res.statusText);
    }
    const payload = await res.json();
    return payload;
  },
  updateGroups: async (offset: number, limit: number): Promise<any> => {
    const res = await jupyterHubAPIRequest(
      `/groups?offset=${offset}&limit=${limit}`,
      'GET'
    );
    if (res.status >= 400) {
      throw new Error('Error fetching groups: ' + res.statusText);
    }
    const payload = await res.json();
    return payload;
  },
  addUsersToGroup: async (users: string[], groupName: string): Promise<any> => {
    const res = await jupyterHubAPIRequest(
      '/groups/' + groupName + '/users',
      'POST',
      { users }
    );
    if (res.status >= 400) {
      throw new Error(`Error adding user to group ${res.statusText}`);
    }
    const payload = await res.json();
    return payload;
  },
  removeUsersFromGroup: async (
    users: string[],
    groupName: string
  ): Promise<any> => {
    const res = await jupyterHubAPIRequest(
      '/groups/' + groupName + '/users',
      'DELETE',
      {
        users
      }
    );
    if (res.status >= 400) {
      throw new Error('Error removing users: ' + res.statusText);
    }
    const payload = await res.json();
    return payload;
  },
  refreshGroups: async (): Promise<any> => {
    const res = await jupyterHubAPIRequest('/groups', 'GET');
    if (res.status >= 400) {
      throw new Error('Error refreshing groups: ' + res.statusText);
    }
    const payload = await res.json();
    return payload;
  },
  deleteGroup: async (name: string): Promise<void> => {
    const res = await jupyterHubAPIRequest('/groups/' + name, 'DELETE');
    if (res.status >= 400) {
      throw new Error('Error deleting group: ' + res.statusText);
    }
  },
  // SERVICE
  getServices: (): Promise<Response> =>
    jupyterHubAPIRequest('/services', 'GET'),
  getService: (naeme: string): Promise<Response> =>
    jupyterHubAPIRequest('/services/' + name, 'GET'),
  // PROXY
  getProxyRoutes: (): Promise<Response> =>
    jupyterHubAPIRequest('/proxy', 'GET'),
  // HUB
  shutdownHub: async (): Promise<void> => {
    const res = await jupyterHubAPIRequest('/shutdown', 'POST');
    if (res.status >= 400) {
      throw new Error('Error shutting down hub: ' + res.statusText);
    }
  }
  //
};

export default jupyterHubApi;
