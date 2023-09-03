import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useNavigate, Link } from 'react-router-dom';
import {
  IconButton,
  RelativeTime,
  PageLayout,
  Label,
  Text,
  Pagination,
  TextInput
} from '@primer/react';
import { PageHeader, Table, DataTable } from '@primer/react/drafts';
import {
  DotFillIcon,
  PencilIcon,
  PeopleIcon,
  SearchIcon,
  SquareFillIcon
} from '@primer/octicons-react';
import UserAdd from './UserAdd';
import {
  setUserOffset,
  setNameFilter,
  getUsersPagination
} from '../../../../redux/actions/user';
import { UserState } from '../../../../redux/state/user';
import { MainState } from '../../../../redux/store';

const Users = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector<MainState, UserState>(state => state.user);
  const { users, user_page, name_filter } = user;

  const offset = user_page ? user_page.offset : 0;
  const limit = user_page ? user_page.limit : 10;
  const total = user_page ? user_page.total : undefined;

  useEffect(() => {
    getUsersPagination(offset, limit, name_filter)(dispatch);
  }, [getUsersPagination, offset, limit, name_filter]);

  if (!users || !user_page) {
    return <div data-testid="no-show"></div>;
  }

  const handleSearch = debounce(async (event: { target: { value: any } }) => {
    setNameFilter(event.target.value)(dispatch);
  }, 300);

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
  }[] = servers.map((server: any, index: number) => {
    return {
      id: index,
      name: server[0].name,
      admin: server[0].admin ? 'admin' : '',
      serverName: server[1].name,
      serverReady: server[1].ready,
      lastActivity: server[1].last_activity
        ? Date.parse(server[1].last_activity)
        : null
    };
  });
  return (
    <>
      <UserAdd offset={offset} limit={limit} name_filter={name_filter} />
      <PageLayout.Content width="full">
        <Table.Container>
          <Table.Title as="h2" id="repositories">
            <PageHeader>
              <PageHeader.TitleArea>
                <PageHeader.LeadingVisual>
                  <PeopleIcon />
                </PageHeader.LeadingVisual>
                <PageHeader.Title>Users</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
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
                  return (
                    <Text
                      color="accent.fg"
                      as={Link}
                      to={`/hub/user/${row.name}`}
                    >
                      {row.name}
                    </Text>
                  );
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
    </>
  );
};

export default Users;
