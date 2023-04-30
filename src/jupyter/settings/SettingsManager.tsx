import Form from '@datalayer/rjsf-primer';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv6';

const schema: RJSFSchema = {
  title: 'Settings',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    hello: { type: 'string', title: 'Hello', default: 'How are you?' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const SettingsFormExample = () => {
  return <Form schema={schema} validator={validator} />;
};

const SettingsManager = (): JSX.Element => {
  return (
    <>
     <SettingsFormExample/>
    </>
  );
};

export default SettingsManager;
