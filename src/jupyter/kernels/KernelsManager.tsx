import Form from '@datalayer/rjsf-primer';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv6';

const schema: RJSFSchema = {
  title: 'Kernels',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    hello: { type: 'string', title: 'Hello', default: 'How are you?' },
    done: { type: 'boolean', title: 'Done?', default: false }
  }
};

const KernelsFormExample = () => {
  return <Form schema={schema} validator={validator} />;
};

const KernelsManager = (): JSX.Element => {
  return (
    <>
      <KernelsFormExample />
    </>
  );
};

export default KernelsManager;
