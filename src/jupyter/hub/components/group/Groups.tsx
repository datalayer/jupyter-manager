import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Breadcrumbs,
  PageLayout,
  ActionList,
  Label,
  Pagination
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { Link } from 'react-router-dom';
import { PeopleIcon } from '@primer/octicons-react';
import { ManagerState } from '../../../Store';
import type { Group } from '../../../Store';
import GroupCreate from './GroupCreate';

const Groups = (props: {
  createGroup: any;
  updateUsers: any;
  updateGroups: any;
  history: any;
  location: any;
}): JSX.Element => {
  const groups_data = useSelector<ManagerState, Group[]>(
    state => state.groups_data
  );
  const groups_page = useSelector<ManagerState, ManagerState['groups_page']>(
    state => state.groups_page
  );
  const dispatch = useDispatch();

  const offset = groups_page ? groups_page.offset : 0;

  const setOffset = (offset: any) => {
    dispatch({
      type: 'GROUPS_OFFSET',
      value: {
        offset: offset
      }
    });
  };
  const limit = groups_page ? groups_page.limit : 10;
  const total = groups_page ? groups_page.total : undefined;

  const { updateGroups, createGroup } = props;

  const dispatchPageUpdate = (
    data: ManagerState['groups_data'],
    page: ManagerState['groups_page']
  ) => {
    dispatch({
      type: 'GROUPS_PAGE',
      value: {
        data: data,
        page: page
      }
    });
  };

  useEffect(() => {
    updateGroups(offset, limit).then((data: any) =>
      dispatchPageUpdate(data.items, data._pagination)
    );
  }, [offset, limit]);

  if (!groups_data || !groups_page) {
    return <div data-testid="no-show"></div>;
  }

  return (
    <>
      <PageLayout>
        <PageLayout.Header sx={{ my: [0, 0, 0, 0] }} divider="line">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/groups" selected>
              Groups
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </PageLayout.Header>
        <GroupCreate createGroup={createGroup} updateGroups={updateGroups} />
        <PageLayout.Content sx={{ p: 3 }}>
          <PageHeader>
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual>
                <PeopleIcon />
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Groups</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>
          <ActionList>
            {groups_data.length > 0 ? (
              groups_data.map((e: any, i: number) => (
                <Link
                  to="/group-edit"
                  key={'group-' + i}
                  state={{ group_data: e }}
                >
                  <ActionList.Item>
                    {e.name}
                    <ActionList.TrailingVisual>
                      <Label>{e.users.length + ' users'}</Label>
                    </ActionList.TrailingVisual>
                  </ActionList.Item>
                </Link>
              ))
            ) : (
              <div>
                <h4>no groups created...</h4>
              </div>
            )}
          </ActionList>
          {total && (
            <Pagination
              pageCount={Math.ceil(total / limit)}
              currentPage={Math.floor(offset / limit) + 1}
              onPageChange={e => {
                e.preventDefault();
                const el = e.target as HTMLAnchorElement;
                const targetPage = parseInt(el.href.split('#').pop() as string);
                const currPage = Math.floor(offset / limit) + 1;
                setOffset(offset + limit * (targetPage - currPage));
              }}
            />
          )}
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default Groups;
