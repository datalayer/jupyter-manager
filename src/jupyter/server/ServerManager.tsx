import Form from '@datalayer/rjsf-primer';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv6';

const schema: RJSFSchema = {
  title: 'Jupyter Server',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    hello: { type: 'string', title: 'Hello', default: 'How are you?' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const FormExample = () => {
  return <Form schema={schema} validator={validator} />;
};

const ServerManager = (): JSX.Element => {
  return (
    <>
     <FormExample/>
    </>
  );
};

export default ServerManager;
