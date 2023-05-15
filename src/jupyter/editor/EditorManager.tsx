import Form from '@datalayer/rjsf-primer';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  title: 'Editor',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    hello: { type: 'string', title: 'Hello', default: 'How are you?' },
    done: { type: 'boolean', title: 'Done?', default: false }
  }
};

const EditorFormExample = () => {
  return <Form schema={schema} validator={validator} />;
};

const EditorManager = (): JSX.Element => {
  return (
    <>
      <EditorFormExample />
    </>
  );
};

export default EditorManager;
