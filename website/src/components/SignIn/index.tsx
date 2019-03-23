import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import AppContext, { IAppContext } from '../../AppContext';
import { Redirect } from 'react-router';

const SignIn = ({ login, user }: IAppContext) => {

  const [fetching, setFetching] = useState(false);

  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ((response as GoogleLoginResponse).getAuthResponse) {
      const token = (response as GoogleLoginResponse).getAuthResponse().id_token;
      login(token);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  if (fetching) {
    return (
      <Container>
        <h1 className="mt-3"><Spinner animation="border" /></h1>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='mt-3'>Sign In</h1>
          <p>Choose a provider</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <GoogleLogin
            clientId={'214419819681-puljv1g8q8hob1b7oemi5uiacilo3165.apps.googleusercontent.com'}
            onSuccess={handleSuccess}
            onFailure={() => setFetching(false)}
            onRequest={() => setFetching(true)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default () => (
  <AppContext.Consumer>
    {values => <SignIn {...values} />}
  </AppContext.Consumer>
);