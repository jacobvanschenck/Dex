import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './AppLayout';

const root = createRoot(document.getElementById('root')!);
root.render(<AppLayout />);
