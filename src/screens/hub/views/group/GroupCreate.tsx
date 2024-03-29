import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, PageLayout, FormControl, TextInput } from '@primer/react';
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

  const dispatch = useDispatch();

  const onCreateGroup = async () => {
    createGroup(groupName)(dispatch);
    getGroupsPagination(offset, limit)(dispatch);
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
              <PlusIcon />
            </PageHeader.LeadingVisual>
            <PageHeader.Title>Create Group</PageHeader.Title>
          </PageHeader.TitleArea>
        </PageHeader>
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
