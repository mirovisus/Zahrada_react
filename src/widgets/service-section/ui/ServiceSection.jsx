import { ServiceCard } from '@shared/ui';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      number: '[01]',
      title: 'Realizace zahrad',
      description: 'Návrh, výsadba a tvorba zahrad.',
      icon: '/images/services/1.svg',
      variant: 'icon'
    },
    {
      id: 2,
      number: '[02]',
      title: 'Údržba trávníku',
      description: 'Sekání, hnojení, vertikutace, zavlažení.',
      image: '/images/services/2.jpg',
      variant: 'image'
    },
    {
      id: 3,
      number: '[03]',
      title: 'Péče o stromy a keře',
      description: 'Prořez, tvarování, odstraňování pařezů.',
      icon: '/images/services/3.svg',
      variant: 'icon'
    },
    {
      id: 4,
      number: '[04]',
      title: 'Zahradní architektura',
      description: 'Chodníky, terasy, pergoly, altány.',
      icon: '/images/services/4.svg',
      variant: 'icon'
    },
    {
      id: 5,
      number: '[05]',
      title: 'Závlahové systémy',
      description: 'Návrh a instalace zavlažování.',
      image: '/images/services/5.jpg',
      variant: 'image'
    },
    {
      id: 6,
      number: '[06]',
      title: 'Péče o záhony',
      description: 'Pletí, mulčování, hnojení, výsadba.',
      image: '/images/services/6.jpg',
      variant: 'image'
    },
    {
      id: 7,
      number: '[07]',
      title: 'Další služby na přání',
      description: 'Kontaktujte nás pro řešení na míru!',
      icon: '/images/services/7.svg',
      variant: 'accent',
      link: '/'
    },
    {
      id: 8,
      number: '[08]',
      title: 'Sezónní údržba',
      description: 'Jarní/podzimní úklid, zazimování.',
      icon: '/images/services/8.svg',
      variant: 'icon'
    }
  ];

  return (
    <section className="section container" id="services">
      <header className="section__header">
        <h2 className="section__title">
          Naše služby v oblasti zahradnických prací
        </h2>
      </header>
      <div className="section__body">
        <div className="services">
          <ul className="services__list grid grid--4">
            {services.map((service) => (
              <li key={service.id} className="services__item">
                <ServiceCard {...service} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection