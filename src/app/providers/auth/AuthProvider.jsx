import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AUTH_STORAGE_KEY = 'zahrada_auth';
const USERS_STORAGE_KEY = 'zahrada_users';
const GARDENS_STORAGE_KEY = 'zahrada_gardens';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuth = !!user;

  // Inicializace testovacích uživatelů při prvním spuštění
  const initializeTestUsers = () => {
    const users = getAllUsers();

    // Pokud ještě nejsou žádní uživatelé, vytvoříme testovací
    if (users.length === 0) {
      const testUsers = [
        {
          id: 1,
          email: 'jan@example.com',
          username: 'Jan',
          password: '1234',
          role: 'owner',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          email: 'marie@example.com',
          username: 'Marie',
          password: '1234',
          role: 'worker',
          createdAt: new Date().toISOString(),
        }
      ];

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(testUsers));
      console.log('Testovací uživatelé vytvořeni:', testUsers);
    }
  };

  // Načtení aktuálního uživatele z localStorage při startu
  useEffect(() => {
    try {
      // Nejdřív inicializujeme testovací uživatele
      initializeTestUsers();

      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Chyba při načítání uživatele z localStorage:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Pomocná funkce pro získání všech uživatelů
  const getAllUsers = () => {
    try {
      const usersData = localStorage.getItem(USERS_STORAGE_KEY);
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Chyba při načítání uživatelů:', error);
      return [];
    }
  };

  // Pomocná funkce pro uložení uživatele do seznamu
  const saveUserToList = (userData) => {
    try {
      const users = getAllUsers();

      // Kontrola, zda uživatel s tímto emailem již existuje
      const existingUserIndex = users.findIndex(u => u.email === userData.email);

      if (existingUserIndex !== -1) {
        // Aktualizujeme existujícího uživatele
        users[existingUserIndex] = userData;
      } else {
        // Přidáme nového uživatele
        users.push(userData);
      }

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Chyba při ukládání uživatele:', error);
      return false;
    }
  };

  // Přihlášení - kontrola emailu a hesla
  const login = (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('Email a heslo jsou povinné');
      }

      // Získáme všechny uživatele
      const users = getAllUsers();

      // Najdeme uživatele s daným emailem
      const foundUser = users.find(u => u.email === email);

      if (!foundUser) {
        throw new Error('Uživatel s tímto emailem neexistuje');
      }

      // Kontrola hesla
      if (foundUser.password !== password) {
        throw new Error('Nesprávné heslo');
      }

      // Vytvoříme bezpečnou verzi uživatele (bez hesla)
      const safeUser = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        role: foundUser.role,
        createdAt: foundUser.createdAt,
      };

      setUser(safeUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));

      return { success: true, user: safeUser };
    } catch (error) {
      console.error('Chyba při přihlášení:', error);
      return { success: false, error: error.message };
    }
  };

  // Odhlášení
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);

      return { success: true };
    } catch (error) {
      console.error('Chyba při odhlášení:', error);
      return { success: false, error: error.message };
    }
  };

  // Registrace nového uživatele
  const signup = (formData) => {
    try {
      const { username, email, password, role = 'owner' } = formData;

      if (!email || !password || !username) {
        throw new Error('Všechna pole jsou povinná');
      }

      if (password.length < 4) {
        throw new Error('Heslo musí mít alespoň 4 znaků');
      }

      // Kontrola, zda email již není zaregistrován
      const users = getAllUsers();
      const emailExists = users.some(u => u.email === email);

      if (emailExists) {
        throw new Error('Uživatel s tímto emailem již existuje');
      }

      // Vytvoříme nového uživatele (s heslem pro uložení)
      const newUserWithPassword = {
        id: Date.now(),
        email,
        username: username,
        password: password,
        role: role,
        createdAt: new Date().toISOString(),
      };

      // Uložíme do seznamu všech uživatelů
      const saved = saveUserToList(newUserWithPassword);

      if (!saved) {
        throw new Error('Chyba při ukládání uživatele');
      }

      // Vytvoříme bezpečnou verzi (bez hesla) pro aktuální session
      const safeUser = {
        id: newUserWithPassword.id,
        email: newUserWithPassword.email,
        username: newUserWithPassword.username,
        role: newUserWithPassword.role,
        createdAt: newUserWithPassword.createdAt,
      };

      setUser(safeUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));

      return { success: true, user: safeUser };
    } catch (error) {
      console.error('Chyba při registraci:', error);
      return { success: false, error: error.message };
    }
  };

  // Aktualizace profilu
  const updateProfile = (updates) => {
    try {
      if (!user) {
        throw new Error('Není přihlášen žádný uživatel');
      }

      const updatedUser = {
        ...user,
        ...updates,
        id: user.id,
        createdAt: user.createdAt,
      };

      setUser(updatedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

      // Aktualizujeme také v seznamu uživatelů
      const users = getAllUsers();
      const userIndex = users.findIndex(u => u.id === user.id);

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          ...updates,
        };
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Chyba při aktualizaci profilu:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuth,
    isLoading,
    login,
    logout,
    signup,
    register: signup,
    updateProfile,
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        Načítání...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;