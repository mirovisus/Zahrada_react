import { GardenCard, AddGardenCard } from '@widgets/garden-card';
import { useAuth } from '@app/providers/auth';

const GardensList = ({ gardens = [] }) => {
  const { user } = useAuth();
  const isOwner = user?.role === 'owner';
  const isWorker = user?.role === 'worker';

  // Pro worker - zatím prázdný seznam požadavků
  const requests = [];

  if (isWorker) {
    return (
      <section className="gardens">
        <h2 className="gardens__title h3">Moje požadavky:</h2>

        {requests.length === 0 ? (
          <div className="gardens__empty">
            <p className="gardens__empty-text">
              Zatím nemáte žádné požadavky
            </p>
          </div>
        ) : (
          <ul className="gardens__list grid grid--3">
            {requests.map((request) => (
              <li key={request.id} className="gardens__item">
                {/* Zde budou karty požadavků */}
                <div className="request-card">
                  <h3>{request.title}</h3>
                  <p>{request.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  // Pro owner - zobrazíme zahrady
  return (
    <section className="gardens">
      <h2 className="gardens__title h3">Moje zahrady:</h2>
      <ul className="gardens__list grid grid--3">
        {/* Zobrazíme všechny zahrady z contextu */}
        {gardens.map((garden) => (
          <li
            key={garden.id}
            className="gardens__item"
          >
            <GardenCard
              id={garden.id}
              image={garden.image}
              name={garden.name}
              city={garden.city}
              street={garden.street}
              house={garden.house}
            />
          </li>
        ))}

        {/* Tlačítko pro přidání nové zahrady - pouze pro owner */}
        <li className="gardens__item">
          <AddGardenCard />
        </li>
      </ul>
    </section>
  )
}

export default GardensList