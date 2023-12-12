import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import { Logo } from '../components/Logo';
import { useEffect } from 'react';

export const Game = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/casino');
  };

  useEffect(() => {
    window.comeon.game.launch(params?.id);
  }, [params?.id]);

  return (
    <Container>
      <Logo />
      <div className="main container">
        <div id="ingame" className="ingame hidden">
          <div className="ui grid centered">
            <div className="three wide column">
              <Button className="ui right floated secondary button inverted" onClick={handleGoBack}>
                <i className="left chevron icon"></i>Back
              </Button>
            </div>
            <div className="ten wide column">
              <div id="game-launch"></div>
            </div>
            <div className="three wide column"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Game;
