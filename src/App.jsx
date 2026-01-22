import { RouterProvider } from 'react-router-dom';
import { router } from './app/providers/router';
import { AuthProvider } from './app/providers/auth';
import { GardensProvider } from './app/providers/gardens';
import './shared/styles/styles.scss';

const App = () => {
  return (
    <AuthProvider>
      <GardensProvider>
        <RouterProvider router={router} />
      </GardensProvider>
    </AuthProvider>
  )
}

export default App