import { useEffect, useState } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HttpMethod } from '../models/HttpMethod';
import { Logo } from '../components/Logo';
import { Notification } from '../components/Notification';

import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(3).required(),
});

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { state, login } = useAuth();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (username && password) {
      let body = {
        username: username,
        password: password,
      };

      schema
        .validate(body)
        .then(async (valid) => {
          const response = await fetch('/login', {
            method: HttpMethod.POST,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(valid),
          });
          if (!response.ok) {
            const errorData = await response.json();
            setError(`Form submission failed! ${errorData?.error}`);
          } else {
            const data = await response.json();
            login(data.player, username);
          }
        })
        .catch((error) => setError(error));
    } else {
      setError('Something wrong! Try one more time!');
    }
  };

  useEffect(() => {
    if (state.user) {
      navigate('/casino');
    }
  }, [navigate, state.user]);

  return (
    <Container>
      <Logo />
      <Notification error={error} />
      <div className="main container">
        <div className="ui grid centered">
          <Form onSubmit={handleSubmit}>
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  minLength="3"
                  onChange={handleUsernameChange}
                  value={username}
                />
                <i aria-hidden="true" className="user icon"></i>
              </div>
            </div>
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  minLength="3"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <i aria-hidden="true" className="lock icon"></i>
              </div>
            </div>
            <Button type="submit">
              Login
              <i className="right chevron icon"></i>
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
