import React from 'react';
import {
  AuthType,
  PUBLIC_ONLY,
  AUTH,
  SEEKER,
  CREATOR,
} from '../auth-types';

import PublicOnlyProtector from './public-only-protector';
import AuthProtector from './auth-protector';
import SeekerProtector from './seeker-protector';
import CreatorProtector from './creator-protector';

type ProtectPageEnum = {
  [Key in AuthType]: (Page: React.FC) => React.ReactNode
};

const protectPageEnum: ProtectPageEnum = {
  [PUBLIC_ONLY]: (Page) => <PublicOnlyProtector><Page /></PublicOnlyProtector>,
  [AUTH]: (Page) => <AuthProtector><Page /></AuthProtector>,
  [SEEKER]: (Page) => <SeekerProtector><Page /></SeekerProtector>,
  [CREATOR]: (Page) => <CreatorProtector><Page /></CreatorProtector>,
};

export default protectPageEnum;
