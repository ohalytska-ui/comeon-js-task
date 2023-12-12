import { Container, Header, Icon, Button } from 'semantic-ui-react';
import { Logo } from '../components/Logo';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <Logo />
      <div className="main container">
        <div className="ui grid centered">
          <Header as="h2" icon>
            <Icon name="settings" />
            Page Not Found
          </Header>
        </div>
        <div className="ui grid centered">
          <Button className="ui right floated secondary button inverted" onClick={handleGoBack}>
            <i className="left chevron icon"></i>Back
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
