import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Contact from '../pages/Contact';
import Index from '../pages/Index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'contacto',
        element: <Contact />,
      },
      // Aquí se pueden agregar más rutas según sea necesario
    ],
  },
]);

export default router; 