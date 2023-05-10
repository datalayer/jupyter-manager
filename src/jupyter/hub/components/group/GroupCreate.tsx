import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flash,
  PageLayout,
  FormControl,
  TextInput
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PlusIcon } from '@primer/octicons-react';
import { HubState } from '../../Store';

const GroupCreate = (props: {
  createGroup: any;
  updateGroups: any;
}): JSX.Element => {
  const [groupName, setGroupName] = useState(''),
    [errorAlert, setErrorAlert] = useState<string | null>(null),
    [successMessage, setSuccessMessage] = useState<string | null>(null),
    limit = useSelector<HubState>(state => state.limit);

  const dispatch = useDispatch();

  const dispatchPageUpdate = (
    data: HubState['groups_data'],
    page: HubState['groups_page']
  ) => {
    dispatch({
      type: 'GROUPS_PAGE',
      value: {
        data: data,
        page: page
      }
    });
  };

  const { createGroup, updateGroups } = props;

  const onCreateGroup = () => {
    createGroup(groupName)
      .then((data: { status: number }) => {
        return data.status < 300
          ? updateGroups(0, limit)
              .then((data: any) =>
                dispatchPageUpdate(data.items, data._pagination)
              )
              .then(() => {
                setGroupName('');
                setSuccessMessage('Group added successfully!');
                setTimeout(() => {
                  setSuccessMessage(null);
                }, 2000);
              })
              .catch(() => setErrorAlert('Could not update groups list.'))
          : setErrorAlert(
              `Failed to create group. ${
                data.status === 409 ? 'Group already exists.' : ''
              }`
            );
      })
      .catch(() => setErrorAlert('Failed to create group.'));
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
          <PageHeader.TitleArea sx={{ mt: 3 }}>
            <PageHeader.LeadingVisual>
              <PlusIcon />
            </PageHeader.LeadingVisual>
            <PageHeader.Title>Create Group</PageHeader.Title>
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
        <FormControl sx={{ mt: 4 }}>
          <FormControl.Label>Name</FormControl.Label>
          <TextInput
            block
            placeholder="Name of the group"
            value={groupName}
            onChange={e => {
              setGroupName(e.target.value.trim());
            }}
          />
        </FormControl>
        <PageLayout.Footer divider="line">
          <Button
            variant="primary"
            onClick={onCreateGroup}
            disabled={!groupName}
          >
            Create Group
          </Button>
        </PageLayout.Footer>
      </PageLayout.Pane>
    </>
  );
};

export default GroupCreate;
