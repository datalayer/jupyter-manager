import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Breadcrumbs,
  Button,
  Flash,
  PageLayout,
  FormControl,
  TextInput
} from '@primer/react';
import { PageHeader } from '@primer/react/drafts';
import { PeopleIcon } from '@primer/octicons-react';
import { HubState } from './../../Store';

const CreateGroup = (props: {
  createGroup: any;
  updateGroups: any;
  history: any;
}): JSX.Element => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState(''),
    [errorAlert, setErrorAlert] = useState<string | null>(null),
    limit = useSelector<HubState>(state => state.limit);

  const dispatch = useDispatch();

  const dispatchPageUpdate = (data: any, page: number) => {
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
              .then((data: any) => dispatchPageUpdate(data, 0))
              .then(() => navigate('/groups'))
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
      <PageLayout>
        <PageLayout.Header divider="line">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/#">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/#/create-group" selected>
              Create Group
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </PageLayout.Header>
        <PageLayout.Content>
          <PageHeader>
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual>
                <PeopleIcon />
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Create Group</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>
          {errorAlert && (
            <Flash sx={{ mt: 4 }} variant="danger">
              {errorAlert}
            </Flash>
          )}
          <FormControl sx={{ mt: 4 }}>
            <FormControl.Label>Name</FormControl.Label>
            <TextInput
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
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

CreateGroup.propTypes = {
  createGroup: PropTypes.func,
  updateGroups: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default CreateGroup;
