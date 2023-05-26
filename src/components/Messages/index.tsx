import { useDispatch, useSelector } from 'react-redux';
import { CloseableFlash } from '@datalayer/primer-addons';
import { Box } from '@primer/react';
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
        <CloseableFlash
          variant="success"
          onClose={() => dispatch(clearGroupSuccess())}
        >
          {groupSuccess}
        </CloseableFlash>
      )}
      {groupError && (
        <CloseableFlash
          variant="danger"
          onClose={() => dispatch(clearGroupError())}
        >
          {groupError}
        </CloseableFlash>
      )}
      {userSuccess && (
        <CloseableFlash
          variant="success"
          onClose={() => dispatch(clearUserSuccess())}
        >
          {userSuccess}
        </CloseableFlash>
      )}
      {userError && (
        <CloseableFlash
          variant="danger"
          onClose={() => dispatch(clearUserError())}
        >
          {userError}
        </CloseableFlash>
      )}
    </Box>
  );
};

export default Messages;
