import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  SegmentedControl,
  RelativeTime,
  PageLayout,
  Label,
  Text,
  Pagination
} from '@primer/react';
import { PageHeader, Table, DataTable } from '@primer/react/drafts';
import {
  DotFillIcon,
  ServerIcon,
  SquareFillIcon
} from '@primer/octicons-react';
import { Server, UserState } from '../../../../redux/state/user';
import {
  setUserOffset,
  getUsersPagination
} from '../../../../redux/actions/user';
import { MainState } from 'src/redux/store';

const Servers = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector<MainState, UserState>(state => state.user);
  const { users, user_page, name_filter } = user;
  const [serverType, setServerType] = useState<'all' | 'running' | 'stopped'>(
    'all'
  );
  const handleSegmentChange = (selectedIndex: number) => {
    const types: ['all', 'running', 'stopped'] = ['all', 'running', 'stopped'];
    setServerType(types[selectedIndex]);
  };

  const offset = user_page ? user_page.offset : 0;
  const limit = user_page ? user_page.limit : 10;
  const total = user_page ? user_page.total : undefined;

  useEffect(() => {
    dispatch(getUsersPagination(offset, limit, name_filter));
  }, [getUsersPagination, offset, limit, name_filter]);

  if (!users || !user_page) {
    return <div data-testid="no-show"></div>;
  }

  type ExtendedServer = Server & {
    belongsTo?: string;
  };

  const servers = users
    .map(user => {
      const userServers: ExtendedServer[] = Object.values(user.servers);
      console.log('test', user);
      userServers.forEach(server => {
        server.belongsTo = user.name;
      });
      return userServers;
    })
    .flat(1);

  const filteredServers = servers.filter(server => {
    if (serverType === 'all') {
      return true;
    }
    const readyCheck = serverType === 'running';
    return server.ready === readyCheck;
  });

  console.log(users, servers);

  const tableData: {
    id: number;
    name: string;
    user: string;
    serverReady: boolean;
    lastActivity: number | null;
    progressURL: string;
  }[] = filteredServers.map((server: any, index: number) => {
    return {
      id: index,
      name: server.name || 'unnamed',
      user: server.belongsTo,
      serverReady: server.ready,
      lastActivity: server.last_activity
        ? Date.parse(server.last_activity)
        : null,
      progressURL: server.progress_url
    };
  });
  return (
    <>
      <PageLayout.Content width="full">
        <Table.Container>
          <Table.Title as="h2" id="repositories">
            <PageHeader>
              <PageHeader.TitleArea>
                <PageHeader.LeadingVisual>
                  <ServerIcon />
                </PageHeader.LeadingVisual>
                <PageHeader.Title>Servers</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Table.Title>
          <Table.Actions>
            <SegmentedControl
              aria-labelledby="server-type"
              aria-describedby="server-type"
              onChange={handleSegmentChange}
            >
              <SegmentedControl.Button selected={serverType === 'all'}>
                All
              </SegmentedControl.Button>
              <SegmentedControl.Button selected={serverType === 'running'}>
                Running
              </SegmentedControl.Button>
              <SegmentedControl.Button selected={serverType === 'stopped'}>
                Stopped
              </SegmentedControl.Button>
            </SegmentedControl>
          </Table.Actions>
          <DataTable
            aria-labelledby="repositories"
            aria-describedby="repositories-subtitle"
            data={tableData}
            columns={[
              {
                header: 'Server',
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
                header: 'User',
                field: 'user',
                sortBy: 'alphanumeric',
                renderCell: row => {
                  return (
                    <Text
                      color="accent.fg"
                      as={Link}
                      to={`/hub/user/${row.user}`}
                    >
                      {row.user}
                    </Text>
                  );
                }
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
                }
              },
              {
                header: 'Status',
                field: 'serverReady',
                renderCell: row => {
                  return row.serverReady ? (
                    <Label variant="success">
                      <DotFillIcon />
                      <Text>Running</Text>
                    </Label>
                  ) : (
                    <Label variant="danger">
                      <SquareFillIcon />
                      <Text>Stopped</Text>
                    </Label>
                  );
                },
                width: 'grow'
              },
              {
                header: 'ProgressURL',
                field: 'progressURL',
                renderCell: row => {
                  return <Text>{row.progressURL}</Text>;
                },
                width: 'grow'
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
              dispatch(setUserOffset(offset + limit * (targetPage - currPage)));
            }}
          />
        )}
      </PageLayout.Content>
    </>
  );
};

export default Servers;
