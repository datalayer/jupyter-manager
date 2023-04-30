import Form from '@datalayer/rjsf-primer';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv6';

const schema: RJSFSchema = {
  title: 'Volumes',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    hello: { type: 'string', title: 'Hello', default: 'How are you?' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const VolumesFormExample = () => {
  return <Form schema={schema} validator={validator} />;
};

const VolumesManager = (): JSX.Element => {
  return (
    <>
     <VolumesFormExample/>
    </>
  );
};

export default VolumesManager;
