import { Authenticator, Placeholder } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { ReactNode } from 'react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID ?? '',
    },
  },
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: 'Choose a username',
      label: 'Username',
      inputProps: { required: true },
    },
    email: {
      order: 2,
      placeholder: 'Enter your email address',
      label: 'Email',
      inputProps: { type: 'email', required: true },
    },
  },
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Authenticator formFields={formFields}>
      {({ user }) =>
        user ? (
          <div>{children}</div>
        ) : (
          <div>
            <h1>Please sign in below: </h1>
          </div>
        )
      }
    </Authenticator>
  );
};

export default AuthProvider;
