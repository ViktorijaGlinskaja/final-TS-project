import HomePageLayout from 'components/layouts/home-page-layout';
import UserPageLayout from 'components/layouts/profile-page-layout';

// public-only
import HomePage from 'pages/public-only/home-page/index';
import AuthPage from 'pages/public-only/auth-page/index';

// no-auth
import ErrorPage from 'pages/error-page';

// auth
import ProfilePage from 'pages/auth/profile-page/index';
import SwipePage from 'pages/auth/user/swipe-page/index';

export type LayoutPageName = 'HomePageLayout' | 'UserPageLayout';
export type DynamicPageName = 'ErrorPage';
export type ConcretePageName = 'HomePage' | 'AuthPage' | 'ProfilePage' | 'SwipePage';

export type PageName = LayoutPageName | ConcretePageName | DynamicPageName;

export type PageRouteMap = {
  [key in PageName]: React.FC
};

const pageRouteMap: PageRouteMap = {
  HomePageLayout,
  UserPageLayout,
  HomePage,
  AuthPage,
  ProfilePage,
  ErrorPage,
  SwipePage,
};

export default pageRouteMap;
