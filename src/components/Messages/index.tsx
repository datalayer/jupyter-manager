import { useDispatch, useSelector } from 'react-redux';
import { Box, Flash, StyledOcticon, Text } from '@primer/react';
import {
  CheckCircleIcon,
  CircleSlashIcon,
  XIcon
} from '@primer/octicons-react';
import { MainState } from '../../redux/store';
import { clearGroupError, clearGroupSuccess } from '../../redux/actions/group';
import { clearUserError, clearUserSuccess } from '../../redux/actions/user';

const Messages = (): JSX.Element => {
  const dispatch = useDispatch();
  const groupSuccess = useSelector<MainState, string | null>(
    state => state.group.success
  );
  const groupError = useSelector<MainState, string | null>(
    state => state.group.error
  );
  const userSuccess = useSelector<MainState, string | null>(
    state => state.user.success
  );
  const userError = useSelector<MainState, string | null>(
    state => state.user.error
  );
  return (
    <Box sx={{ mx: 2 }}>
      {groupSuccess && (
        <Flash
          sx={{ my: 2 }}
          variant="success"
          onClick={() => dispatch(clearGroupSuccess())}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <StyledOcticon icon={CheckCircleIcon} />
              <Text color="success.fg">{groupSuccess}</Text>
            </Box>
            <StyledOcticon icon={XIcon} />
          </Box>
        </Flash>
      )}
      {groupError && (
        <Flash
          sx={{ my: 2 }}
          variant="danger"
          onClick={() => dispatch(clearGroupError())}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <StyledOcticon icon={CircleSlashIcon} />
              <Text color="danger.fg">{groupError}</Text>
            </Box>
            <StyledOcticon icon={XIcon} />
          </Box>
        </Flash>
      )}
      {userSuccess && (
        <Flash
          sx={{ my: 2 }}
          variant="success"
          onClick={() => dispatch(clearUserSuccess())}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <StyledOcticon icon={CheckCircleIcon} />
              <Text color="success.fg">{userSuccess}</Text>
            </Box>
            <StyledOcticon icon={XIcon} />
          </Box>
        </Flash>
      )}
      {userError && (
        <Flash
          sx={{ my: 2 }}
          variant="danger"
          onClick={() => dispatch(clearUserError())}
        >
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <StyledOcticon icon={CircleSlashIcon} />
              <Text color="danger.fg">{userError}</Text>
            </Box>
            <StyledOcticon icon={XIcon} />
          </Box>
        </Flash>
      )}
    </Box>
  );
};

export default Messages;
