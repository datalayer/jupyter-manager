import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { HubState } from '../../Store';
import type { Server, User } from '../../Store';

const UserEdit = (props: {
  location: any;
  UserEdit: any;
  deleteUser: any;
  updateUsers: any;
  noChangeEvent: any;
  history: any;
}): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const limit = useSelector<HubState>(state => state.limit);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const dispatch = useDispatch();

  const dispatchPageChange = (data: any, page: number) => {
    dispatch({
      type: 'USER_PAGE',
      value: {
        data: data,
        page: page
      }
    });
  };

  const { UserEdit, deleteUser, noChangeEvent, updateUsers } = props;

  const onDeleteUser = () => {
    deleteUser(username)
      .then((data: { status: number }) => {
        data.status < 300
          ? updateUsers(0, limit)
              .then((data: any) => dispatchPageChange(data, 0))
              .then(() => navigate('/'))
              .catch(() => setErrorAlert('Could not update users list.'))
          : setErrorAlert('Failed to delete user.');
      })
      .catch(() => {
        setErrorAlert('Failed to delete user.');
      });
  };

  const onApplyChanges = () => {
    if (updatedUsername === '' && admin === has_admin) {
      noChangeEvent();
      return;
    } else {
      UserEdit(
        username,
        updatedUsername !== '' ? updatedUsername : username,
        admin
      )
        .then((data: { status: number }) => {
          data.status < 300
            ? updateUsers(0, limit)
                .then((data: any) => dispatchPageChange(data, 0))
                .then(() => navigate('/'))
                .catch(() => setErrorAlert('Could not update users list.'))
            : setErrorAlert('Failed to edit user.');
        })
        .catch(() => {
          setErrorAlert('Failed to edit user.');
        });
    }
  };

  if (location.state === undefined) {
    navigate('/');
    return <></>;
  }

  const {
    user,
    server
  }: {
    user: User;
    server: Server;
  } = location.state;

  const { servers, ...filteredUser } = user;
  const { name: username, admin: has_admin } = user;

  const [updatedUsername, setUpdatedUsername] = useState('');
  const [admin, setAdmin] = useState(has_admin);

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
          <hr />
          <Button block variant="danger" onClick={onDeleteUser}>
            Delete User
          </Button>
        </PageLayout.Pane>
        <PageLayout.Content>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <ObjectTableViewer data={server} title={'Server Data'} />
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
