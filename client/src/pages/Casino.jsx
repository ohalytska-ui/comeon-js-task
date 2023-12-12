import { Container } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { debounce } from '../utiles/debounce';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HttpMethod } from '../models/HttpMethod';
import { GamesList } from '../components/GamesList';
import { CategoriesList } from '../components/CategoriesList';
import { Notification } from '../components/Notification';
import { Logo } from '../components/Logo';
import { UserProfile } from '../components/UserProfile';

export const Casino = () => {
  const [allGames, setAllGames] = useState(null);
  const [error, setError] = useState('');
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterGames, setFilterGames] = useState([]);
  const [user, setUser] = useState(null);

  const { state, logout } = useAuth();

  const navigate = useNavigate();

  const handleOnSearch = (e) => {
    debounce(setSearchString)(e.currentTarget.value);
  };

  const handleLogout = async () => {
    let body = {
      username: state.username,
    };

    const response = await fetch('/logout', {
      method: HttpMethod.POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const msg = errorData?.errors ? errorData?.errors?.[0].msg : errorData?.error;
      setError(`Logout failed! ${msg}`);
    } else {
      logout();
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      setUser(state.user);
    }
  }, [state.isAuthenticated, state.user]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/games', {
          method: HttpMethod.GET,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          setError('Error fetching data!');
        } else {
          const data = await response.json();
          setAllGames(data);
        }
      } catch (error) {
        setError(`Error fetching data! ${error.message}`);
      }
    })();
  }, []);

  useEffect(() => {
    let filteredAndSearchedGames = allGames ?? [];

    if (selectedFilter) {
      filteredAndSearchedGames = filteredAndSearchedGames.filter((game) =>
        game.categoryIds.includes(selectedFilter.id),
      );
    }

    if (searchString) {
      const regex = new RegExp(searchString?.trim(), 'i');
      filteredAndSearchedGames = filteredAndSearchedGames.filter(({ name }) => {
        return name.match(regex);
      });
    }

    setFilterGames(filteredAndSearchedGames);
  }, [allGames, searchString, selectedFilter]);

  return (
    <Container>
      <Logo />
      <Notification error={error} />
      <div className="main container">
        <div className="casino hidden">
          <div className="ui grid centered">
            <UserProfile user={user} handleLogout={handleLogout} />
            <div className="four wide column">
              <div className="search ui small icon input ">
                <input type="text" placeholder="Search Game" onChange={handleOnSearch} />
                <i className="search icon"></i>
              </div>
            </div>
          </div>
          <div className="ui grid">
            <GamesList games={filterGames} />
            <CategoriesList handleCategoryFilter={setSelectedFilter} setError={setError} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Casino;
