import { Outlet } from 'react-router-dom';
import { PublicHeader } from '@widgets/header';
import {Footer} from "@widgets/footer";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;