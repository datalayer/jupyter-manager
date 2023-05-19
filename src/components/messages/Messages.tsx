import { useSelector } from 'react-redux';
import { Box, Flash, StyledOcticon, Link } from '@primer/react'
import { CircleSlashIcon, XIcon } from '@primer/octicons-react';
import { MainState } from '../../redux/store';

const Messages = (): JSX.Element => {
  const groupError = useSelector<MainState, string>(state => state.group.error);
  const userError = useSelector<MainState, string>(state => state.user.error);
  const resetGroupError = () => {
    window.alert('TODO resetGroupError');
  }
  const resetUserError = () => {
    window.alert('TODO resetUserError');
  }
  return (
    <Box>
      <Flash variant="danger">
        <Box sx={{display: 'flex'}}>
          <Box sx={{flexGrow: 1}}>
            <StyledOcticon icon={CircleSlashIcon} />
            {groupError}
          </Box>
          <Box>
            <Link href="javascript:return false;" onClick={() => resetGroupError()}>
              <StyledOcticon icon={XIcon} />
            </Link>
          </Box>
        </Box>
      </Flash>
      <Flash variant="danger">
        <Box sx={{display: 'flex'}}>
          <Box sx={{flexGrow: 1}}>
            <StyledOcticon icon={CircleSlashIcon} />
            {userError}
          </Box>
          <Box>
            <Link href="javascript:return false;" onClick={() => resetUserError()}>
              <StyledOcticon icon={XIcon} />
            </Link>
          </Box>
        </Box>
      </Flash>
    </Box>
  );
};

export default Messages;
