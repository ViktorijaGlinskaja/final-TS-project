import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelector } from 'store/auth';
import routes from '../routes';

const CreatorProtector: React.FC = ({ children }) => {
  const auth = useSelector(authSelector);

  if (!auth.loggedIn) {
    return <Navigate to={routes.HomePage} />;
  }

  return <div>{children}</div>;
};

export default CreatorProtector;
