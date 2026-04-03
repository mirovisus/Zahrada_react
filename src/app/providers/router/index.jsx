/**
 * Konfigurace routování aplikace
 * Definuje všechny dostupné routes a jejich mapování na komponenty stránek
 */
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, PrivateLayout } from '@app/layouts';

import LoginPage from '@pages/login/ui/LoginPage';
import SignupPage from '@pages/signup/ui/SignupPage';
import ProfilePage from '@pages/profile/ui/ProfilePage';
import { GardenCreatePage } from '@pages/garden-create';
import { GardenEditPage } from '@pages/garden-edit';
import { HomePage } from '@pages/home';
import { ApplicationPage } from '@pages/application';

import ProtectedRoute from './ProtectedRoute'

// Dočasné placeholder stránky
const OffersPage = () => <div className="container"><h1>Aktuální nabídky (TODO)</h1></div>;

export const router = createBrowserRouter([
  // Veřejné stránky
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'offers', element: <OffersPage /> },
      { path: 'application', element: <ApplicationPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },

  // Privátní stránky
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'profile', element: <ProfilePage /> },
      { path: 'gardens/create', element: <GardenCreatePage /> },
      { path: 'gardens/:id/edit', element: <GardenEditPage /> },
    ],
  },
]);