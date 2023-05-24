import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Flash,
  PageLayout,
  FormControl,
  TextInputWithTokens
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PersonAddIcon } from '@primer/octicons-react';
import { addUsers } from '../../../../redux/actions/user';

const UserAdd = (): JSX.Element => {
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState<string>('');
  const [newUsers, setNewUsers] = React.useState<
    { text: string; id: number }[]
  >([]);
  const [admin, setAdmin] = useState(false);
  const [errorAlert, _] = useState<string | null>(null);

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
    navigate('/');
  };

  return (
    <>
      <PageLayout.Content>
        <PageHeader>
          <PageHeader.TitleArea>
            <PageHeader.LeadingVisual>
              <PersonAddIcon />
            </PageHeader.LeadingVisual>
            <PageHeader.Title>Add Users</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
        {errorAlert && (
          <Flash sx={{ mt: 4 }} variant="danger">
            {errorAlert}
          </Flash>
        )}
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
      </PageLayout.Content>
    </>
  );
};

export default UserAdd;
