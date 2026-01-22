import { Outlet } from 'react-router-dom';
import { PrivateHeader } from '@widgets/header';

const PrivateLayout = () => {
  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
};

export default PrivateLayout;