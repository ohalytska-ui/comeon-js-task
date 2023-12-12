import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export const GamesList = ({ games }) => {
  const navigate = useNavigate();

  const handlePlay = (game) => {
    navigate(`/game/${game.code}`);
  };

  return (
    <div className="twelve wide column">
      <h3 className="ui dividing header">Games</h3>
      <div className="ui relaxed divided game items links">
        {games && games.length ? (
          <>
            {games.map((game) => (
              <div className="game item" key={game.code}>
                <div className="ui small image">
                  <img src={game.icon} alt="game-icon" />
                </div>
                <div className="content">
                  <div className="header">
                    <b className="name">{game.name}</b>
                  </div>
                  <div className="description">{game.description}</div>
                  <div className="extra">
                    <Button
                      className="play ui right floated secondary button inverted"
                      onClick={() => handlePlay(game)}
                    >
                      Play
                      <i className="right chevron icon"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};
