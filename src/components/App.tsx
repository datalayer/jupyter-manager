import { createRoot } from 'react-dom/client';
import Manager from './Manager';

const root = createRoot(
  document.getElementById('datalayer-root') as HTMLElement
);

root.render(<Manager />);
