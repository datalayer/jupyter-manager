import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  Checkbox,
  Flash,
  PageLayout,
  FormControl,
  TextInput
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PencilIcon } from '@primer/octicons-react';

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

  const limit = useSelector(state => state.limit),
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

  const { username, has_admin } = location.state;

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
          <FormControl sx={{ mt: 4 }}>
            <FormControl.Label>New Username</FormControl.Label>
            <TextInput
              placeholder="Updated username"
              value={updatedUsername}
              onChange={e => {
                setUpdatedUsername(e.target.value.trim());
              }}
            />
          </FormControl>
          <FormControl sx={{ mt: 3 }}>
            <Checkbox checked={admin} onChange={() => setAdmin(!admin)} />
            <FormControl.Label>Give Admin Privileges</FormControl.Label>
          </FormControl>
          <PageLayout.Footer divider="line">
            <ButtonGroup>
              <Button variant="danger" onClick={onDeleteUser}>
                Delete User
              </Button>
              <Button
                variant="primary"
                onClick={onApplyChanges}
                disabled={
                  (updatedUsername === '' || username === updatedUsername) &&
                  admin === has_admin
                }
              >
                Apply Changes
              </Button>
            </ButtonGroup>
          </PageLayout.Footer>
        </PageLayout.Content>
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
