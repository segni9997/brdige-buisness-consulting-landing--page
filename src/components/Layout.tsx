import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen w-full">
      {isHomePage ? (
        children
      ) : (
        <>
          <Header />
          <main className="pt-16 sm:pt-20">
            {children}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;