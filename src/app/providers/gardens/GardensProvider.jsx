import { useEffect, useState } from 'react';
import { GardensContext } from './GardensContext';
import { useAuth } from '@app/providers/auth';

const STORAGE_KEY = 'zahrada_gardens';

const GardensProvider = ({ children }) => {
  const { user } = useAuth();
  const [allGardens, setAllGardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Načtení všech zahrad z localStorage při startu
  useEffect(() => {
    try {
      const savedGardens = localStorage.getItem(STORAGE_KEY);

      if (savedGardens) {
        setAllGardens(JSON.parse(savedGardens)); // ← Было setGardens, исправлено на setAllGardens
      } else {
        // Mock data pro demo (pouze pokud není nic v localStorage)
        const mockGardens = [
          {
            id: 1,
            userId: 1, // jan@example.com
            name: 'Moje první zahrada',
            area: '50',
            city: 'Pardubice',
            street: 'Lomená',
            house: '1314',
            zip: '53002',
            image: '/images/profile/garden-1.png',
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            userId: 1, // jan@example.com
            name: 'Květinový ráj',
            area: '30',
            city: 'Hradec Králové',
            street: 'Jabloňová',
            house: '27',
            zip: '50001',
            image: '/images/profile/garden-2.png',
            createdAt: new Date().toISOString(),
          },
        ];

        setAllGardens(mockGardens);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockGardens));
      }
    } catch (error) {
      console.error('Chyba při načítání zahrad:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filtrujeme zahrady pro aktuálního uživatele
  const gardens = user
    ? allGardens.filter(garden => garden.userId === user.id)
    : [];

  // Přidání nové zahrady
  const addGarden = (gardenData) => {
    try {
      if (!user) {
        return { success: false, error: 'Není přihlášen žádný uživatel' };
      }

      const newGarden = {
        ...gardenData,
        id: Date.now(),
        userId: user.id, // Přiřadíme ID aktuálního uživatele
        createdAt: new Date().toISOString(),
      };

      const updated = [...allGardens, newGarden];
      setAllGardens(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return { success: true, garden: newGarden };
    } catch (error) {
      console.error('Chyba při přidání zahrady:', error);
      return { success: false, error: error.message };
    }
  };

  // Aktualizace existující zahrady
  const updateGarden = (id, gardenData) => {
    try {
      if (!user) {
        return { success: false, error: 'Není přihlášen žádný uživatel' };
      }

      // Najdeme zahradu
      const garden = allGardens.find(g => g.id === Number(id));

      // Kontrola, zda zahrada patří aktuálnímu uživateli
      if (!garden) {
        return { success: false, error: 'Zahrada neexistuje' };
      }

      if (garden.userId !== user.id) {
        return { success: false, error: 'Nemáte oprávnění upravit tuto zahradu' };
      }

      const updated = allGardens.map((g) =>
        g.id === Number(id)
          ? { ...g, ...gardenData, updatedAt: new Date().toISOString() }
          : g
      );

      setAllGardens(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return { success: true };
    } catch (error) {
      console.error('Chyba při aktualizaci zahrady:', error);
      return { success: false, error: error.message };
    }
  };

  // Smazání zahrady
  const deleteGarden = (id) => {
    try {
      if (!user) {
        return { success: false, error: 'Není přihlášen žádný uživatel' };
      }

      // Najdeme zahradu
      const garden = allGardens.find(g => g.id === Number(id));

      // Kontrola, zda zahrada patří aktuálnímu uživateli
      if (!garden) {
        return { success: false, error: 'Zahrada neexistuje' };
      }

      if (garden.userId !== user.id) {
        return { success: false, error: 'Nemáte oprávnění smazat tuto zahradu' };
      }

      const updated = allGardens.filter((g) => g.id !== Number(id));
      setAllGardens(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return { success: true };
    } catch (error) {
      console.error('Chyba při mazání zahrady:', error);
      return { success: false, error: error.message };
    }
  };

  // Získání zahrady podle ID (s kontrolou vlastnictví)
  const getGardenById = (id) => {
    if (!user) return null;

    const garden = allGardens.find((g) => g.id === Number(id));

    // Vrátíme jen pokud patří aktuálnímu uživateli
    if (garden && garden.userId === user.id) {
      return garden;
    }

    return null;
  };

  const value = {
    gardens, // Filtrované zahrady pro aktuálního uživatele
    isLoading,
    addGarden,
    updateGarden,
    deleteGarden,
    getGardenById,
  };

  return (
    <GardensContext.Provider value={value}>
      {children}
    </GardensContext.Provider>
  );
};

export default GardensProvider;