import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  IconButton,
  Label,
  PageLayout,
  Pagination,
  RelativeTime,
  TextInput
} from '@primer/react';
import { Table, DataTable } from '@primer/react/drafts';
import { PencilIcon, SearchIcon } from '@primer/octicons-react';
import { MainState } from '../../../../redux/store';
import {
  setUserOffset,
  setNameFilter,
  getUsersPagination,
  shutdownHub,
  startServer,
  stopServer,
  startAllServers,
  stopAllServers
} from '../../../../redux/actions/user';
import { UserState } from '../../../../redux/state/user';

const Overview = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector<MainState, UserState>(state => state.user);
  const { users, user_page, name_filter } = user;

  const offset = user_page ? user_page.offset : 0;
  const limit = user_page ? user_page.limit : 10;
  const total = user_page ? user_page.total : undefined;

  console.log(users);
  useEffect(() => {
    getUsersPagination(offset, limit, name_filter)(dispatch);
  }, [getUsersPagination, offset, limit, name_filter]);

  if (!users || !user_page) {
    return <div data-testid="no-show"></div>;
  }

  const handleSearch = debounce(async (event: { target: { value: any } }) => {
    setNameFilter(event.target.value)(dispatch);
  }, 300);

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
          stopServer(userName, serverName)(dispatch);
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
          startServer(userName, serverName)(dispatch);
        }}
      >
        Start Server
      </Button>
    );
  };

  const servers = users.flatMap((user: { server: any; servers: any }) => {
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
    lastActivity: number | null;
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
        : null
    };
  });
  return (
    <>
      <PageLayout.Content>
        <Table.Container>
          <Table.Title as="h2" id="repositories">
            Users
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
                            navigate(`/hub${row.serverURL as string}`)
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
                            navigate(
                              `/spawn/${row.name}${
                                row.serverName ? '/' + row.serverName : ''
                              }`
                            )
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
                      onClick={() => navigate(`/hub/user/${row.name}`)}
                    />
                  );
                },
                width: 'auto'
              }
            ]}
          />
        </Table.Container>
        {total && (
          <Pagination
            pageCount={Math.ceil(total / limit)}
            currentPage={Math.floor(offset / limit) + 1}
            onPageChange={e => {
              e.preventDefault();
              const el = e.target as HTMLAnchorElement;
              const targetPage = parseInt(el.href.split('#').pop() as string);
              const currPage = Math.floor(offset / limit) + 1;
              setUserOffset(offset + limit * (targetPage - currPage))(dispatch);
            }}
          />
        )}
      </PageLayout.Content>
      <PageLayout.Pane>
        <Button
          block
          sx={{ mb: 3 }}
          variant="primary"
          onClick={() => navigate('/hub/users')}
        >
          Manage Users
        </Button>
        <Button
          block
          sx={{ mb: 3 }}
          variant="primary"
          onClick={() => navigate('/hub/groups')}
        >
          Manage Groups
        </Button>
        <Button
          block
          sx={{ mb: 3 }}
          variant="primary"
          onClick={() => {
            startAllServers(users.map((e: { name: any }) => e.name))(dispatch);
          }}
        >
          Start All Servers
        </Button>
        <Button
          block
          sx={{ mb: 3 }}
          variant="danger"
          onClick={() => {
            stopAllServers(users.map((e: { name: any }) => e.name))(dispatch);
          }}
        >
          Stop All Servers
        </Button>
        <Button
          block
          sx={{ mb: 3 }}
          variant="danger"
          id="shutdown-button"
          onClick={() => {
            shutdownHub()(dispatch);
          }}
        >
          Shutdown Hub
        </Button>
      </PageLayout.Pane>
    </>
  );
};

export default Overview;
