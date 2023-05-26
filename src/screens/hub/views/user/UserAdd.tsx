import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Checkbox,
  PageLayout,
  FormControl,
  TextInputWithTokens
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PersonAddIcon } from '@primer/octicons-react';
import { addUsers, getUsersPagination } from '../../../../redux/actions/user';

const UserAdd = ({
  offset,
  limit,
  name_filter
}: {
  offset: number;
  limit: number;
  name_filter: string;
}): JSX.Element => {
  const [currUser, setCurrUser] = useState<string>('');
  const [newUsers, setNewUsers] = React.useState<
    { text: string; id: number }[]
  >([]);
  const [admin, setAdmin] = useState(false);

  const dispatch = useDispatch();

  const onNewUserRemove = (newUserId: string | number) => {
    setNewUsers(newUsers.filter(newUser => newUser.id !== Number(newUserId)));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrUser(event.target.value);
    if (event.target.value.includes(' ')) {
      const len = newUsers.length;
      const split_users = event.target.value
        .split(' ')
        .map((u, i) => ({
          text: u.trim(),
          id: len ? newUsers[len - 1].id + 1 + i : i
        }))
        .filter(u => u.text.length > 0);
      setNewUsers(prevUsers => [...prevUsers, ...split_users]);
      setCurrUser('');
    }
  };

  const handleBlur = () => {
    if (currUser) {
      const len = newUsers.length;
      setNewUsers(prevUsers => [
        ...prevUsers,
        { text: currUser, id: len ? newUsers[len - 1].id + 1 : 0 }
      ]);
      setCurrUser('');
    }
  };

  const onAddUsers = () => {
    const users: string[] = newUsers.map(user => user.text);
    dispatch(addUsers(users, admin));
    dispatch(getUsersPagination(offset, limit, name_filter));
    setNewUsers([]);
    setCurrUser('');
  };

  return (
    <>
      <PageLayout.Pane
        divider={{
          narrow: 'line',
          regular: 'line',
          wide: 'line'
        }}
        position={{
          narrow: 'start',
          regular: 'start',
          wide: 'start'
        }}
      >
        <PageHeader>
          <PageHeader.TitleArea>
            <PageHeader.LeadingVisual>
              <PersonAddIcon />
            </PageHeader.LeadingVisual>
            <PageHeader.Title>Add Users</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
        <FormControl sx={{ mt: 4 }}>
          <FormControl.Label>New User(s)</FormControl.Label>
          <TextInputWithTokens
            preventTokenWrapping
            block
            tokens={newUsers}
            onTokenRemove={onNewUserRemove}
            value={currUser}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              !newUsers.length ? 'Press space to add a user' : undefined
            }
          />
        </FormControl>
        <FormControl sx={{ mt: 3 }}>
          <Checkbox onChange={() => setAdmin(!admin)} />
          <FormControl.Label>Give Admin Privileges</FormControl.Label>
        </FormControl>
        <PageLayout.Footer divider="line">
          <Button
            variant="primary"
            onClick={onAddUsers}
            disabled={!newUsers.length}
          >
            Add Users
          </Button>
        </PageLayout.Footer>
      </PageLayout.Pane>
    </>
  );
};

export default UserAdd;
