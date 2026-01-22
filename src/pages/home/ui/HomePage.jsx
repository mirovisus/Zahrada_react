import { Hero, AboutSection } from '@widgets/main';
import { ServicesSection } from '@widgets/service-section';

const HomePage = () => {
  return (
    <>
      <main className="content">
        <Hero />
        <AboutSection />
        <ServicesSection />
      </main>
    </>
  );
};

export default HomePage;