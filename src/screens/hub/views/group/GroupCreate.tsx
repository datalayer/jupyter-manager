import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Flash,
  PageLayout,
  FormControl,
  TextInput
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PlusIcon } from '@primer/octicons-react';
import {
  createGroup,
  getGroupsPagination
} from '../../../../redux/actions/group';

const GroupCreate = ({
  offset,
  limit
}: {
  offset: number;
  limit: number;
}): JSX.Element => {
  const [groupName, setGroupName] = useState('');
  const [errorAlert] = useState<string | null>(null);
  const [successMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const onCreateGroup = async () => {
    dispatch(createGroup(groupName));
    dispatch(getGroupsPagination(offset, limit));
    setGroupName('');
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
            block
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
