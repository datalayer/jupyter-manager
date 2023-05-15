import { useSelector } from 'react-redux';
import validator from '@rjsf/validator-ajv8';
import Form from '@datalayer/rjsf-primer';
import { ManagerState } from './../Store';

const ServerManager = (): JSX.Element => {
  const schema = useSelector<ManagerState, {}>(state => state.config_schema);
  return (
    <>
      <Form schema={schema} validator={validator} />
    </>
  )
}

export default ServerManager;
