import { useNavigate } from 'react-router-dom';
import { GardenForm } from '@widgets/garden-form';
import { useGardens } from '@app/providers/gardens';

const GardenCreatePage = () => {
  const navigate = useNavigate();
  const { addGarden } = useGardens();

  const handleCreateGarden = (gardenData) => {
    // Přidáme zahradu do contextu (automaticky se uloží do localStorage)
    const result = addGarden(gardenData);

    if (result.success) {
      // Přesměrujeme na profil po úspěšném vytvoření
      navigate('/profile');
    } else {
      console.error('Chyba při vytváření zahrady:', result.error);
    }
  };

  return (
    <main className="content">
      <section className="section container">
        <GardenForm onSubmit={handleCreateGarden} />
      </section>
    </main>
  );
};

export default GardenCreatePage;