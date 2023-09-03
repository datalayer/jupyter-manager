import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  PageLayout,
  FormControl,
  TextInput
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PencilIcon } from '@primer/octicons-react';
import ObjectTableViewer from '../../../../components/ObjectTableViewer';
import type { MainState } from '../../../../redux/store';
import type { UserState } from '../../../../redux/state/user';
import {
  editUser,
  deleteUser,
  getCurrentUser
} from '../../../../redux/actions/user';

const UserEdit = (): JSX.Element => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!name) {
    navigate('/');
    return <></>;
  }

  const user = useSelector<MainState, UserState>(state => state.user);
  const { user: user_data, loading } = user;

  const [updatedUsername, setUpdatedUsername] = useState('');
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser(name)(dispatch);
  }, [getCurrentUser, name]);

  useEffect(() => {
    setAdmin(user_data?.admin || false);
  }, [user_data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user_data) {
    return <div></div>;
  }

  const { server } = user_data;
  const { servers: _, ...filteredUser } = user_data; //eslint-disable-line
  const { name: username, admin: has_admin } = user_data;

  const onDeleteUser = () => {
    deleteUser(username)(dispatch);
    navigate('/hub/users');
  };

  const onApplyChanges = async () => {
    const success = await editUser(
        username,
        updatedUsername !== '' ? updatedUsername : username,
        admin
      )(dispatch)
    ;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (success) {
      navigate(`/hub/user/${updatedUsername}`);
      setUpdatedUsername('');
    }
    console.log(success);
  };

  return (
    <>
      <PageLayout.Pane
        divider={{
          narrow: 'line',
          regular: 'line',
          wide: 'line'
        }}
        /*
        position={{
          narrow: 'start',
          regular: 'start',
          wide: 'start'
        }}
        */
      >
        <PageHeader>
          <PageHeader.TitleArea sx={{ mt: 3 }}>
            <PageHeader.LeadingVisual>
              <PencilIcon />
            </PageHeader.LeadingVisual>
            <PageHeader.Title>Editing {username}</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
        <FormControl sx={{ mt: 3 }}>
          <FormControl.Label>Update Username</FormControl.Label>
          <TextInput
            block
            placeholder="Updated username"
            value={updatedUsername}
            onChange={e => {
              setUpdatedUsername(e.target.value.trim());
            }}
          />
        </FormControl>
        <FormControl sx={{ my: 3 }}>
          <Checkbox checked={admin} onChange={() => setAdmin(!admin)} />
          <FormControl.Label>Give Admin Privileges</FormControl.Label>
        </FormControl>
        <Button
          block
          variant="primary"
          onClick={onApplyChanges}
          disabled={
            (updatedUsername === '' || username === updatedUsername) &&
            admin === has_admin
          }
        >
          Apply Changes
        </Button>
        <PageLayout.Footer divider="line">
          <Button block variant="danger" onClick={onDeleteUser}>
            Delete User
          </Button>
        </PageLayout.Footer>
      </PageLayout.Pane>
      <PageLayout.Content>
        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'] }}>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <ObjectTableViewer data={server ?? {}} title={'Server Data'} />
          </Box>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <ObjectTableViewer data={filteredUser} title={'User Data'} />
          </Box>
        </Box>
      </PageLayout.Content>
    </>
  );
};

export default UserEdit;
