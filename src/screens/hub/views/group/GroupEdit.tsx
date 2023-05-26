import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import {
  Box,
  Button,
  PageLayout,
  Heading,
  FormControl,
  TextInput,
  IconButton
} from '@primer/react';
import {
  AlertIcon,
  PencilIcon,
  PersonIcon,
  TrashIcon
} from '@primer/octicons-react';
import { PageHeader } from '@primer/react/drafts';
import type { MainState } from '../../../../redux/store';
import { GroupState } from '../../../../redux/state/group';
import {
  addUserToGroup,
  removeFromGroup,
  deleteGroup,
  updateGroupProps,
  getCurrentGroup
} from '../../../../redux/actions/group';

const GroupEdit = (): JSX.Element => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!name) {
    navigate('/hub/groups');
    return <></>;
  }

  const group = useSelector<MainState, GroupState>(state => state.group);
  const { group: group_data, loading } = group;

  const [username, setUsername] = useState('');
  const [groupUsers, setGroupUsers] = useState(group_data?.users || []);
  const [groupProps, setGroupProps] = useState(group_data?.properties || {});
  const [newPropKey, setNewPropKey] = useState('');
  const [newPropValue, setNewPropValue] = useState('');

  useEffect(() => {
    dispatch(getCurrentGroup(name));
  }, [getCurrentGroup, name]);

  useEffect(() => {
    setGroupUsers(group_data?.users || []);
    setGroupProps(group_data?.properties || {});
  }, [group_data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!group_data) {
    return <div></div>;
  }

  const onUserAdd = () => {
    dispatch(addUserToGroup(group_data.name, username));
    setUsername('');
  };

  const onRemoveUser = (username: string) => {
    dispatch(removeFromGroup(group_data.name, [username]));
  };

  const onPropUpdate = () => {
    dispatch(updateGroupProps(group_data.name, groupProps));
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
      <PageLayout.Content sx={{ p: 3 }}>
        <PageHeader>
          <PageHeader.TitleArea>
            <PageHeader.LeadingVisual>
              <PencilIcon />
            </PageHeader.LeadingVisual>
            <PageHeader.Title>Editing {group_data.name}</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'] }}>
          <Box sx={{ flexGrow: 1 / 4 }}>
            <Heading sx={{ fontSize: 1, mt: 4 }}>Manage group members</Heading>
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
                  <Box sx={{ color: 'gray', fontSize: 1 }}>No Users Added.</Box>
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
                  dispatch(deleteGroup(group_data.name));
                  navigate('/hub/groups');
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
    </>
  );
};

export default GroupEdit;
