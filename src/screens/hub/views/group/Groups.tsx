import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageLayout, ActionList, Label, Pagination } from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PeopleIcon } from '@primer/octicons-react';
import GroupCreate from './GroupCreate';
import { GroupState } from '../../../../redux/state/group';
import {
  setGroupOffset,
  getGroupsPagination
} from '../../../../redux/actions/group';
import { MainState } from '../../../../redux/store';

const Groups = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const group = useSelector<MainState, GroupState>(state => state.group);
  const { groups, group_page } = group;

  const offset = group_page ? group_page.offset : 0;
  const limit = group_page ? group_page.limit : 10;
  const total = group_page ? group_page.total : undefined;

  useEffect(() => {
    getGroupsPagination(group_page.offset, group_page.limit)(dispatch);
  }, [getGroupsPagination, offset, limit]);

  if (!groups || !group_page) {
    return <div data-testid="no-show"></div>;
  }

  return (
    <>
      <GroupCreate offset={offset} limit={limit} />
      <PageLayout.Content>
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
              <ActionList.Item
                key={'group-' + i}
                onSelect={() => navigate(`/hub/groups/${e.name}`)}
              >
                {e.name}
                <ActionList.TrailingVisual>
                  <Label>{e.users.length + ' users'}</Label>
                </ActionList.TrailingVisual>
              </ActionList.Item>
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
              setGroupOffset(offset + limit * (targetPage - currPage))(dispatch);
            }}
          />
        )}
      </PageLayout.Content>
    </>
  );
};

export default Groups;
