import { override, addWebpackAlias } from 'customize-cra';
import { resolve } from 'path';
import relativePaths from './absolute-paths';

const aliases = Object.entries(relativePaths)
  .reduce((aliasesObj, [alias, aliasPath]) => ({
    ...aliasesObj,
    [alias]: resolve(__dirname, aliasPath),
  }), {});

export default override(
  addWebpackAlias(aliases),
);