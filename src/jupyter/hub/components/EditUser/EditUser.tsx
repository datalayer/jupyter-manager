import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
import { HubState } from './../../Store';
import ObjectTableViewer from '../ObjectTableViewer/ObjectTableViewer';

type Server = {
  last_activity: string | null;
  name: string;
  pending: boolean | null;
  progress_url: string;
  ready: boolean;
  started: boolean | null;
  state: any;
  stopped: boolean;
  url: string;
  user_options: any;
};

type User = {
  admin: boolean;
  auth_state: any;
  created: string;
  groups: any[];
  kind: string;
  last_activity: string | null;
  name: string;
  pending: boolean | null;
  roles: string[];
  server: Server | null;
  servers: Server[];
};

const EditUser = (props: {
  location: any;
  editUser: any;
  deleteUser: any;
  updateUsers: any;
  noChangeEvent: any;
  history: any;
}): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const limit = useSelector<HubState>(state => state.limit),
    [errorAlert, setErrorAlert] = useState<string | null>(null);

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

  const { editUser, deleteUser, noChangeEvent, updateUsers } = props;

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
      editUser(
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { servers, ...filteredUser } = user;
  const { name: username, admin: has_admin } = user;

  const [updatedUsername, setUpdatedUsername] = useState(''),
    [admin, setAdmin] = useState(has_admin);

  return (
    <>
      <PageLayout>
        <PageLayout.Header divider="line">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/#">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/#/edit-user" selected>
              Edit User
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </PageLayout.Header>
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
        <PageLayout.Pane>
          <PageHeader>
            <PageHeader.TitleArea>
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
      </PageLayout>
    </>
  );
};

EditUser.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      username: PropTypes.string,
      has_admin: PropTypes.bool
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  editUser: PropTypes.func,
  deleteUser: PropTypes.func,
  noChangeEvent: PropTypes.func,
  updateUsers: PropTypes.func
};

export default EditUser;
