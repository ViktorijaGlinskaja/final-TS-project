import { PageName, ConcretePageName, DynamicPageName } from './page-route-enum';
import {
  PUBLIC_ONLY,
  AUTH,
  AuthType,
} from './auth-types';

export type RoutePageData = {
  index?: true,
  path?: string,
  auth?: AuthType
};

export type ConcreteRoutePageData = RoutePageData & {
  pageName: ConcretePageName,
};

export type DynamicRoutePageData = RoutePageData & {
  pageName: DynamicPageName,
};

export type RouteData = RouteLayoutData | ConcreteRoutePageData | DynamicRoutePageData;

export type RouteLayoutData = {
  path: string,
  pageName: PageName,
  childRoutes: Array<RouteData>
};

const dynamicSymbols = ['*', ':'];

export const isConcretePath = (path?: RoutePageData['path']): boolean => {
  if (path) {
    return dynamicSymbols.every((dynamicSymbol) => !path.includes(dynamicSymbol));
  }

  return false;
};

export const isIndexPage = (index: RoutePageData['index']): boolean => Boolean(index);

const routeStructure: Array<RouteData> = [
  {
    path: '/',
    pageName: 'HomePageLayout',
    childRoutes: [
      { index: true, pageName: 'HomePage' },
      { path: 'auth', pageName: 'AuthPage', auth: PUBLIC_ONLY },
      { path: '*', pageName: 'ErrorPage' },
    ],
  },
  {
    path: '/profile',
    pageName: 'UserPageLayout',
    childRoutes: [
      { index: true, pageName: 'ProfilePage', auth: AUTH },
    ],
  },
  {
    path: '/swiper',
    pageName: 'SwipePage',
    auth: AUTH,
  },
];

export default routeStructure;
