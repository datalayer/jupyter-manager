import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumbs,
  Box,
  Button,
  Checkbox,
  Flash,
  PageLayout,
  FormControl,
  TextInput
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PencilIcon } from '@primer/octicons-react';
import PropTypes from 'prop-types';
import ObjectTableViewer from '../common/ObjectTableViewer';
import type { MainState } from '../../../../redux/store2';
import type { UserState } from '../../../../redux/state/user';
import { editUser, deleteUser, getCurrentUser } from '../../../../redux/actions/user';

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

  const [errorAlert] = useState<string | null>(null);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCurrentUser(name));
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
  const { servers, ...filteredUser } = user_data;
  const { name: username, admin: has_admin } = user_data;

  const onDeleteUser = () => {
    dispatch(deleteUser(username));
    navigate('/');
  };

  const onApplyChanges = () => {
    dispatch(
      editUser(
        username,
        updatedUsername !== '' ? updatedUsername : username,
        admin
      )
    );
  };

  return (
    <>
      <PageLayout>
        <PageLayout.Header sx={{ my: [0, 0, 0, 0] }} divider="line">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/#">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/#/user-edit" selected>
              Edit User
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </PageLayout.Header>
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
            <PageHeader.TitleArea sx={{ mt: 3 }}>
              <PageHeader.LeadingVisual>
                <PencilIcon />
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Editing {username}</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>
          {errorAlert && (
            <Flash sx={{ mt: 4 }} variant="danger">
              {errorAlert}
            </Flash>
          )}
          <FormControl sx={{ mt: 3 }}>
            <FormControl.Label>New Username</FormControl.Label>
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
      </PageLayout>
    </>
  );
};

UserEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      username: PropTypes.string,
      has_admin: PropTypes.bool
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  UserEdit: PropTypes.func,
  deleteUser: PropTypes.func,
  noChangeEvent: PropTypes.func,
  updateUsers: PropTypes.func
};

export default UserEdit;
