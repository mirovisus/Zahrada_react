import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { GardenForm } from '@widgets/garden-form';
import { useGardens } from '@app/providers/gardens';

const GardenEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getGardenById, updateGarden, deleteGarden } = useGardens();

  // Získáme zahradu podle ID z URL
  const gardenData = getGardenById(id);

  // Pokud zahrada neexistuje, přesměrujeme na profil
  if (!gardenData) {
    return <Navigate to="/profile" replace />;
  }

  const handleUpdateGarden = (updatedData) => {
    // Aktualizujeme zahradu v contextu
    const result = updateGarden(id, updatedData);

    if (result.success) {
      // Přesměrujeme zpět na profil
      navigate('/profile');
    } else {
      console.error('Chyba při aktualizaci zahrady:', result.error);
    }
  };

  const handleDeleteGarden = () => {
    // Smažeme zahradu
    const result = deleteGarden(id);

    if (result.success) {
      // Přesměrujeme zpět na profil
      navigate('/profile');
    } else {
      console.error('Chyba při mazání zahrady:', result.error);
      alert(result.error || 'Chyba při mazání zahrady');
    }
  };

  return (
    <main className="content">
      <section className="section container">
        <GardenForm
          mode="edit"
          initialData={gardenData}
          onSubmit={handleUpdateGarden}
          onDelete={handleDeleteGarden}
        />
      </section>
    </main>
  );
};

export default GardenEditPage;