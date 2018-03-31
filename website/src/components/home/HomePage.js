import React from 'react';
import LunchForm from './LunchForm';

const HomePage = (props) => {
  const registrationUrl = '/authentication/register';
  const loginUrl = '/authentication/login';
  const needsRegistrationGreeting = !props.user;
  const registrationGreeting = needsRegistrationGreeting ?
    (
      <p>
        Get started by <a href={registrationUrl}>registering</a> or <a href={loginUrl}>logging in.</a>
      </p>
    )
    : null;
  return (
    <div>
      <h1>Welcome to Lunch Tracker!</h1>
      {registrationGreeting}
      <LunchForm />
    </div>
  );
};

export default HomePage;