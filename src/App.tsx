import { createRoot } from 'react-dom/client';
import Manager from './Manager';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Manager />);
