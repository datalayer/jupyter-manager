import { useEffect } from 'react';
import { connect } from 'react-redux';
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
import GroupCreate from './GroupCreate';
import { GroupState } from '../../reducers/group';
import {
  createGroup,
  setGroupOffset,
  getGroupsPagination
} from '../../actions/group';

const Groups = ({
  createGroup,
  setGroupOffset,
  getGroupsPagination,
  group: { groups, group_page }
}: {
  createGroup: any;
  setGroupOffset: any;
  getGroupsPagination: any;
  group: GroupState;
}): JSX.Element => {
  const offset = group_page ? group_page.offset : 0;
  const limit = group_page ? group_page.limit : 10;
  const total = group_page ? group_page.total : undefined;

  useEffect(() => {
    getGroupsPagination(group_page.offset, group_page.limit);
  }, [getGroupsPagination, offset, limit]);

  if (!groups || !group_page) {
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
        <GroupCreate
          createGroup={createGroup}
          updateGroups={getGroupsPagination}
        />
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
            {groups.length > 0 ? (
              groups.map((e: any, i: number) => (
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
                setGroupOffset(offset + limit * (targetPage - currPage));
              }}
            />
          )}
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  group: state.group
});

export default connect(mapStateToProps, {
  createGroup,
  setGroupOffset,
  getGroupsPagination
})(Groups);
