import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  IconButton,
  Flash,
  Label,
  PageLayout,
  RelativeTime,
  TextInput
} from '@primer/react';
import { Table, DataTable } from '@primer/react/drafts';
import { PencilIcon, SearchIcon } from '@primer/octicons-react';
import { HubState } from '../Store';

import './../../../../style/jupyterhub/server-dashboard.css';

const HubDashboard = (props: {
  updateUsers: any;
  shutdownHub: any;
  startServer: any;
  stopServer: any;
  startAll: any;
  stopAll: any;
  history: any;
}): JSX.Element => {
  const navigate = useNavigate();

  const base_url = window.location.origin || '/';
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const user_data = useSelector<HubState, any>(state => state.user_data);
  const user_page = useSelector<HubState, { offset: number; limit: number }>(
    state => state.user_page
  );
  const name_filter = useSelector<HubState, string>(state => state.name_filter);

  const offset = user_page ? user_page.offset : 0;
  const limit = user_page ? user_page.limit : 10;

  const dispatch = useDispatch();

  const {
    updateUsers,
    shutdownHub,
    startServer,
    stopServer,
    startAll,
    stopAll
  } = props;

  const dispatchPageUpdate = (data: any, page: any) => {
    dispatch({
      type: 'USER_PAGE',
      value: {
        data: data,
        page: page
      }
    });
  };

  const setNameFilter = (name_filter: any) => {
    dispatch({
      type: 'USER_NAME_FILTER',
      value: {
        name_filter: name_filter
      }
    });
  };

  useEffect(() => {
    updateUsers(offset, limit, name_filter)
      .then((data: { items: any; _pagination: any }) =>
        dispatchPageUpdate(data.items, data._pagination)
      )
      .catch((err: any) => setErrorAlert('Failed to update user list.'));
  }, [offset, limit, name_filter]);

  if (!user_data || !user_page) {
    return <div data-testid="no-show"></div>;
  }

  const slice = [offset, limit, name_filter];

  const handleSearch = debounce(async (event: { target: { value: any } }) => {
    setNameFilter(event.target.value);
  }, 300);

  const StartAllServers = () => {
    Promise.all(startAll(user_data.map((e: { name: any }) => e.name)))
      .then(res => {
        const failedServers = res.filter(e => !e.ok);
        if (failedServers.length > 0) {
          setErrorAlert(
            `Failed to start ${failedServers.length} ${
              failedServers.length > 1 ? 'servers' : 'server'
            }. ${
              failedServers.length > 1 ? 'Are they ' : 'Is it '
            } already running?`
          );
        }
        return res;
      })
      .then(res => {
        updateUsers(...slice)
          .then((data: { items: any; _pagination: any }) => {
            dispatchPageUpdate(data.items, data._pagination);
          })
          .catch(() => setErrorAlert('Failed to update users list.'));
        return res;
      })
      .catch(() => setErrorAlert('Failed to start servers.'));
  };

  const StopAllServers = () => {
    Promise.all(stopAll(user_data.map((e: { name: any }) => e.name)))
      .then(res => {
        const failedServers = res.filter(e => !e.ok);
        if (failedServers.length > 0) {
          setErrorAlert(
            `Failed to stop ${failedServers.length} ${
              failedServers.length > 1 ? 'servers' : 'server'
            }. ${
              failedServers.length > 1 ? 'Are they ' : 'Is it '
            } already stopped?`
          );
        }
        return res;
      })
      .then(res => {
        updateUsers(...slice)
          .then((data: { items: any; _pagination: any }) => {
            dispatchPageUpdate(data.items, data._pagination);
          })
          .catch(() => setErrorAlert('Failed to update users list.'));
        return res;
      })
      .catch(() => setErrorAlert('Failed to stop servers.'));
  };

  const StopServerButton = ({
    serverName,
    userName
  }: {
    serverName: string;
    userName: string;
  }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    return (
      <Button
        variant="danger"
        disabled={isDisabled}
        onClick={() => {
          setIsDisabled(true);
          stopServer(userName, serverName)
            .then((res: { status: number }) => {
              if (res.status < 300) {
                updateUsers(...slice)
                  .then((data: { items: any; _pagination: any }) => {
                    dispatchPageUpdate(data.items, data._pagination);
                  })
                  .catch(() => {
                    setIsDisabled(false);
                    setErrorAlert('Failed to update users list.');
                  });
              } else {
                setErrorAlert('Failed to stop server.');
                setIsDisabled(false);
              }
              return res;
            })
            .catch(() => {
              setErrorAlert('Failed to stop server.');
              setIsDisabled(false);
            });
        }}
      >
        Stop Server
      </Button>
    );
  };

  const StartServerButton = ({
    serverName,
    userName
  }: {
    serverName: string;
    userName: string;
  }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    return (
      <Button
        variant="primary"
        disabled={isDisabled}
        onClick={() => {
          setIsDisabled(true);
          startServer(userName, serverName)
            .then((res: { status: number }) => {
              if (res.status < 300) {
                updateUsers(...slice)
                  .then((data: { items: any; _pagination: any }) => {
                    dispatchPageUpdate(data.items, data._pagination);
                  })
                  .catch(() => {
                    setErrorAlert('Failed to update users list.');
                    setIsDisabled(false);
                  });
              } else {
                setErrorAlert('Failed to start server.');
                setIsDisabled(false);
              }
              return res;
            })
            .catch(() => {
              setErrorAlert('Failed to start server.');
              setIsDisabled(false);
            });
        }}
      >
        Start Server
      </Button>
    );
  };

  const servers = user_data.flatMap((user: { server: any; servers: any }) => {
    const userServers = Object.values({
      '': user.server || {},
      ...(user.servers || {})
    });
    return userServers.map(server => [user, server]);
  });

  const tableData: {
    id: number;
    name: string;
    admin: string;
    serverName: string;
    lastActivity: number;
    serverReady: boolean;
    serverURL: string;
  }[] = servers.map((server: any, index: number) => {
    return {
      id: index,
      name: server[0].name,
      admin: server[0].admin ? 'admin' : '',
      serverName: server[1].name,
      serverReady: server[1].ready,
      serverURL: server[1].ready ? server[1].url : '',
      lastActivity: server[1].last_activity
        ? Date.parse(server[1].last_activity)
        : null,
      state: {
        user: server[0],
        server: server[1]
      }
    };
  });
  return (
    <>
      {errorAlert && (
        <Flash sx={{ mt: 4 }} variant="danger">
          {errorAlert}
        </Flash>
      )}
      <PageLayout>
        <PageLayout.Header divider="line">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/" selected>
              Home
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </PageLayout.Header>
        <PageLayout.Content>
          <Table.Container>
            <Table.Title as="h2" id="repositories">
              Server Dashboard
            </Table.Title>
            <Table.Actions>
              <TextInput
                trailingVisual={SearchIcon}
                aria-label="Search users"
                name="search-user"
                placeholder="Search users"
                defaultValue={name_filter}
                onChange={handleSearch}
              />
            </Table.Actions>
            <DataTable
              aria-labelledby="repositories"
              aria-describedby="repositories-subtitle"
              data={tableData}
              columns={[
                {
                  header: 'User',
                  field: 'name',
                  rowHeader: true,
                  width: 'grow',
                  sortBy: 'alphanumeric',
                  renderCell: row => {
                    return <>{row.name}</>;
                  },
                  minWidth: '100px',
                  maxWidth: '300px'
                },
                {
                  header: 'Role',
                  field: 'admin',
                  sortBy: 'alphanumeric',
                  renderCell: row => {
                    return row.admin ? <Label>admin</Label> : <></>;
                  },
                  width: '100px'
                },
                {
                  header: 'Server',
                  field: 'serverName',
                  renderCell: row => {
                    return <>{row.serverName}</>;
                  },
                  maxWidth: '100px'
                },
                {
                  header: 'Last Activity',
                  field: 'lastActivity',
                  sortBy: 'datetime',
                  renderCell: row => {
                    return row.lastActivity ? (
                      <RelativeTime date={new Date(row.lastActivity)} />
                    ) : (
                      <></>
                    );
                  },
                  width: '150px'
                },
                {
                  header: 'Running',
                  field: 'serverReady',
                  renderCell: row => {
                    return row.serverReady ? (
                      // Stop Single-user server
                      <>
                        <ButtonGroup>
                          <StopServerButton
                            serverName={row.serverName as string}
                            userName={row.name}
                          />
                          <Button
                            onClick={() =>
                              (window.location.href = row.serverURL as string)
                            }
                          >
                            Access Server
                          </Button>
                        </ButtonGroup>
                      </>
                    ) : (
                      // Start Single-user server
                      <>
                        <ButtonGroup>
                          <StartServerButton
                            serverName={row.serverName as string}
                            userName={row.name}
                          />
                          <Button
                            onClick={() =>
                              (window.location.href = `${base_url}spawn/${
                                row.name
                              }${row.serverName ? '/' + row.serverName : ''}`)
                            }
                          >
                            Spawn Page
                          </Button>
                        </ButtonGroup>
                      </>
                    );
                  },
                  width: 'grow'
                },
                {
                  id: 'actions',
                  header: '',
                  renderCell: row => {
                    return (
                      <IconButton
                        aria-label={`Edit ${row.name}`}
                        title={`Edit ${row.name}`}
                        icon={PencilIcon}
                        variant="invisible"
                        onClick={() =>
                          navigate('/edit-user', {
                            state: {
                              user: servers[row.id][0],
                              server: servers[row.id][1]
                            }
                          })
                        }
                      />
                    );
                  },
                  width: 'auto'
                }
              ]}
            />
          </Table.Container>
        </PageLayout.Content>
        <PageLayout.Pane>
          <Button
            block
            sx={{ mb: 3 }}
            variant="primary"
            onClick={() => navigate('/add-users')}
          >
            Add Users
          </Button>
          <Button
            block
            sx={{ mb: 3 }}
            variant="primary"
            onClick={() => navigate('/groups')}
          >
            Manage Groups
          </Button>
          <Button
            block
            sx={{ mb: 3 }}
            variant="primary"
            onClick={StartAllServers}
          >
            Start All Servers
          </Button>
          <Button
            block
            sx={{ mb: 3 }}
            variant="danger"
            onClick={StopAllServers}
          >
            Stop All Servers
          </Button>
          <Button
            block
            sx={{ mb: 3 }}
            variant="danger"
            id="shutdown-button"
            onClick={shutdownHub}
          >
            Shutdown Hub
          </Button>
        </PageLayout.Pane>
      </PageLayout>
    </>
  );
};

HubDashboard.propTypes = {
  user_data: PropTypes.array,
  updateUsers: PropTypes.func,
  shutdownHub: PropTypes.func,
  startServer: PropTypes.func,
  stopServer: PropTypes.func,
  startAll: PropTypes.func,
  stopAll: PropTypes.func,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

export default HubDashboard;
