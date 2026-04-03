import { FeatureCard } from '@shared/ui';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: 'Sledujte proměny',
      description: 'Ukládejte fotografie před a po úpravách a objevujte, jak se vaše zahrada mění a vyvíjí.',
      image: '/images/features/features_1.jpg',
      variant: 'first'
    },
    {
      id: 2,
      title: 'Vše na jednom místě',
      description: 'Spravujte a sledujte každý projekt přímo z vašeho mobilního zařízení.',
      variant: 'default'
    },
    {
      id: 3,
      title: 'Reporty',
      description: 'Získejte snadný přístup k reportům přidaným k vašim zahradám.',
      variant: 'default'
    },
    {
      id: 4,
      title: 'Hodnocení',
      description: 'Po dokončení každé práce můžete ohodnotit pracovníky.',
      variant: 'default'
    }
  ];

  return (
    <section className="section container">
      <header className="section__header">
        <h2 className="section__title">
          Hlavní funkce aplikace:
        </h2>
      </header>
      <div className="section__body">
        <div className="features">
          <ul className="features__list grid grid--4">
            {features.map((feature) => (
              <li key={feature.id} className="features__item">
                <FeatureCard {...feature} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection