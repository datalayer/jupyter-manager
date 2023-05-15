import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { isEqual } from 'lodash';
import {
  Box,
  Breadcrumbs,
  Button,
  PageLayout,
  Heading,
  FormControl,
  TextInput,
  Flash,
  IconButton
} from '@primer/react';
import {
  AlertIcon,
  PencilIcon,
  PersonIcon,
  TrashIcon
} from '@primer/octicons-react';
import { PageHeader } from '@primer/react/drafts';
import { ManagerState } from '../../../Store';

const GroupEdit = (props: {
  location: any;
  history: any;
  addToGroup: any;
  removeFromGroup: any;
  deleteGroup: any;
  updateGroups: any;
  updateProp: any;
  validateUser: any;
}): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  if (!location.state) {
    navigate('/groups');
    return <></>;
  }

  const { group_data } = location.state;
  if (!group_data) {
    return <div></div>;
  }

  const limit = useSelector<ManagerState, ManagerState['limit']>(
    state => state.limit
  );

  const [username, setUsername] = useState('');
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [groupUsers, setGroupUsers] = useState(group_data.users);
  const [groupProps, setGroupProps] = useState<Record<string, string>>(
    group_data.properties
  );
  const [newPropKey, setNewPropKey] = useState('');
  const [newPropValue, setNewPropValue] = useState('');

  const {
    addToGroup,
    removeFromGroup,
    deleteGroup,
    updateGroups,
    validateUser,
    updateProp
  } = props;

  const dispatchPageUpdate = (data: any, page: any) => {
    dispatch({
      type: 'GROUPS_PAGE',
      value: {
        data: data,
        page: page
      }
    });
  };

  const onUserAdd = () => {
    validateUser(username).then((exists: boolean) => {
      if (exists) {
        if (!groupUsers.includes(username)) {
          addToGroup([username], group_data.name)
            .then((data: { status: number }) => {
              if (data.status < 300) {
                setUsername('');
                setSuccessMessage('User successfully added to the group');
                setTimeout(() => {
                  setSuccessMessage(null);
                }, 1000);
                setGroupUsers([...groupUsers, username]);
                return true;
              } else {
                setErrorAlert(
                  `Failed to add user to group. ${
                    data.status === 409 ? 'User already exists.' : ''
                  }`
                );
                setTimeout(() => {
                  setErrorAlert(null);
                }, 2000);
                return false;
              }
            })
            .catch(() => {
              setErrorAlert('Failed to add user.');
              setTimeout(() => {
                setErrorAlert(null);
              }, 2000);
            });
        } else {
          setErrorAlert(`"${username}" already exists in the group.`);
          setTimeout(() => {
            setErrorAlert(null);
          }, 2000);
        }
      } else {
        setErrorAlert(`"${username}" is not a valid JupyterHub user.`);
        setTimeout(() => {
          setErrorAlert(null);
        }, 2000);
      }
    });
  };

  const onRemoveUser = (username: string) => {
    removeFromGroup([username], group_data.name)
      .then((data: { status: number }) => {
        if (data.status < 300) {
          const updatedGroup = groupUsers;
          const index = updatedGroup.indexOf(username);
          if (index > -1) {
            updatedGroup.splice(index, 1);
          }
          setUsername('');
          setSuccessMessage('User successfully removed from the group');
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
          setGroupUsers(updatedGroup);
          return true;
        } else {
          setErrorAlert('Failed to remove user from group.}');
          setTimeout(() => {
            setErrorAlert(null);
          }, 2000);
          return false;
        }
      })
      .catch(() => {
        setErrorAlert('Failed to remove user.');
        setTimeout(() => {
          setErrorAlert(null);
        }, 2000);
      });
  };

  const onPropUpdate = () => {
    updateProp(groupProps, group_data.name)
      .then((data: { status: number }) => {
        if (data.status < 300) {
          setUsername('');
          setSuccessMessage('Group properties updated succesfully');
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
          group_data.properties = groupProps;
          return true;
        } else {
          setErrorAlert('Failed to update group properties');
          return false;
        }
      })
      .catch(() => {
        setErrorAlert('Failed to update group properties');
        setTimeout(() => {
          setErrorAlert(null);
        }, 2000);
      });
  };

  const Cell = (props: {
    groupKey: string;
    groupValue: string;
    groupProps: Record<string, string>;
  }) => {
    const [keyInput, setKeyInput] = useState<string>(props.groupKey);
    const [valInput, setValInput] = useState<string>(props.groupValue);
    const [allowEdit, setAllowEdit] = useState<boolean>(false);
    const [keyError, setKeyError] = useState<boolean>(false);
    return (
      <>
        <TextInput
          sx={{ flexGrow: 1, mr: 2 }}
          name="key"
          trailingVisual="Key"
          value={keyInput}
          validationStatus={keyError ? 'error' : undefined}
          disabled={!allowEdit}
          onChange={e => {
            setKeyInput(e.target.value);
            if (props.groupProps[e.target.value]) {
              setKeyError(true);
            } else {
              setKeyError(false);
            }
          }}
        />

        <TextInput
          sx={{ flexGrow: 1, mr: 2 }}
          trailingVisual="Value"
          name="value"
          value={valInput}
          disabled={!allowEdit}
          onChange={e => {
            setValInput(e.target.value);
          }}
        />

        <Button
          sx={{ mr: 2 }}
          variant={allowEdit ? 'primary' : undefined}
          disabled={
            allowEdit &&
            (keyError ||
              (props.groupKey === keyInput && props.groupValue === valInput))
          }
          onClick={() => {
            if (allowEdit) {
              setGroupProps((prevProps: Record<string, string>) => {
                const index = Object.keys(prevProps).indexOf(props.groupKey);
                const newGroupProps = {
                  ...prevProps,
                  [keyInput]: prevProps[props.groupKey]
                };
                delete newGroupProps[props.groupKey];
                if (index < Object.keys(prevProps).length - 1) {
                  const keys = Object.keys(newGroupProps);
                  const newKeys = [
                    ...keys.slice(0, index),
                    ...keys.slice(index + 1, keys.length),
                    keys[index]
                  ];
                  const reorderedGroupProps = newKeys.reduce((acc, key) => {
                    return {
                      ...acc,
                      [key]: newGroupProps[key]
                    };
                  }, {});
                  return reorderedGroupProps;
                } else {
                  return newGroupProps;
                }
              });
              setAllowEdit(false);
            } else {
              setAllowEdit(true);
            }
          }}
        >
          {allowEdit ? 'Update' : 'Edit'}
        </Button>

        <IconButton
          aria-label="Delete"
          variant="danger"
          icon={TrashIcon}
          onClick={() => {
            setGroupProps((prevProps: Record<string, string>) => {
              const newProps = { ...prevProps };
              delete newProps[props.groupKey];
              return newProps;
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      <PageLayout>
        <PageLayout.Header sx={{ my: [0, 0, 0, 0] }} divider="line">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#/groups">Groups</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/group-edit" selected>
              {group_data.name}
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </PageLayout.Header>
        <PageLayout.Content sx={{ p: 3 }}>
          <PageHeader>
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual>
                <PencilIcon />
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Editing {group_data.name}</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>
          {errorAlert && (
            <Flash sx={{ mt: 4 }} variant="danger">
              {errorAlert}
            </Flash>
          )}
          {successMessage && (
            <Flash sx={{ mt: 4 }} variant="success">
              {successMessage}
            </Flash>
          )}
          <Box sx={{ display: 'flex', flexDirection: ['column', 'row'] }}>
            <Box sx={{ flexGrow: 1 / 4 }}>
              <Heading sx={{ fontSize: 1, mt: 4 }}>
                Manage group members
              </Heading>
              <Box sx={{ mt: 2 }}>
                {groupUsers.length > 0 ? (
                  groupUsers.map((user: any, i: number) => (
                    <Box
                      key={'user-' + i}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <PersonIcon />
                        <Box sx={{ ml: 2, fontSize: 1 }}>{user}</Box>
                      </Box>
                      <IconButton
                        aria-label="Delete"
                        variant="danger"
                        size="small"
                        icon={TrashIcon}
                        onClick={() => onRemoveUser(user)}
                      />
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      py: 4,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: 'border.default',
                      borderRadius: 2
                    }}
                  >
                    <Box sx={{ color: 'gray', fontSize: 1 }}>
                      No Users Added.
                    </Box>
                  </Box>
                )}
              </Box>
              <FormControl sx={{ mt: 2 }}>
                <FormControl.Label>Add User</FormControl.Label>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <TextInput
                    sx={{ flexGrow: 1, mr: 2 }}
                    placeholder="Add by username"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value.trim());
                    }}
                  />
                  <Button
                    variant="primary"
                    onClick={onUserAdd}
                    disabled={!username}
                  >
                    Add User
                  </Button>
                </Box>
              </FormControl>
              <PageLayout.Footer divider="line">
                <Button
                  block
                  variant="danger"
                  onClick={() => {
                    const groupName = group_data.name;
                    deleteGroup(groupName)
                      // TODO add error if res not ok
                      .then((res: { status: number }) => {
                        res.status < 300
                          ? updateGroups(0, limit)
                              .then(
                                (data: { items: any; _pagination: any }) => {
                                  dispatchPageUpdate(
                                    data.items,
                                    data._pagination
                                  );
                                }
                              )
                              .then(() => navigate('/groups'))
                          : setErrorAlert('Failed to delete group.');
                      })
                      .catch(() => setErrorAlert('Failed to delete group.'));
                  }}
                >
                  Delete Group
                </Button>
              </PageLayout.Footer>
            </Box>
            <Box sx={{ flexGrow: 1, ml: [0, 4] }}>
              <Heading sx={{ fontSize: 1, mt: 4, mb: 2 }}>
                Manage group properties
              </Heading>
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'attention.emphasis',
                  borderRadius: 2,
                  color: 'attention.emphasis',
                  fontSize: 1
                }}
              >
                <AlertIcon />
                <Box sx={{ ml: 2 }}>Changes are NOT saved until you Apply!</Box>
              </Box>
              <Box>
                {Object.keys(groupProps).length > 0 ? (
                  Object.entries(groupProps).map(
                    ([key, value]: any, i: number) => (
                      <Box sx={{ display: 'flex', mb: 2 }} key={'user-' + i}>
                        <Cell
                          groupKey={key}
                          groupValue={value}
                          groupProps={groupProps}
                        />
                      </Box>
                    )
                  )
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      py: 4,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: 'border.default',
                      borderRadius: 2
                    }}
                  >
                    <Box sx={{ color: 'gray', fontSize: 1 }}>
                      No Group Properties.
                    </Box>
                  </Box>
                )}
              </Box>
              <Box>
                <Heading sx={{ fontSize: 1, mt: 3 }}>Add a property</Heading>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <TextInput
                    sx={{ flexGrow: 1, mr: 2 }}
                    trailingVisual="Key"
                    name="new-prop-key"
                    value={newPropKey}
                    onChange={e => setNewPropKey(e.target.value)}
                    placeholder="Enter new property key"
                  />

                  <TextInput
                    sx={{ flexGrow: 1, mr: 2 }}
                    trailingVisual="Value"
                    name="new-prop-value"
                    value={newPropValue}
                    onChange={e => setNewPropValue(e.target.value)}
                    placeholder="Enter new property value"
                  />

                  <Button
                    variant="primary"
                    onClick={() => {
                      const newGroupProps = groupProps;
                      if (!newGroupProps[newPropKey]) {
                        setGroupProps({
                          ...groupProps,
                          [newPropKey]: newPropValue
                        });
                        setNewPropKey('');
                        setNewPropValue('');
                      } else {
                        setErrorAlert(
                          'Property already exists, you can Update it instead.'
                        );
                        setTimeout(() => {
                          setErrorAlert(null);
                        }, 2000);
                      }
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
              <PageLayout.Footer divider="line">
                <Button
                  block
                  variant="primary"
                  disabled={isEqual(groupProps, group_data.properties)}
                  onClick={onPropUpdate}
                >
                  Apply Changes
                </Button>
              </PageLayout.Footer>
            </Box>
          </Box>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default GroupEdit;
