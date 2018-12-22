import 'react-app-polyfill/ie11';
import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters';
import { withConsole } from '@storybook/addon-console';
import { ThemeProvider } from 'styled-components';
import Theme from '../src/styles/theme';
import '../src/styles/cssIncludes';
import '../src/styles';

setOptions({
  name: `React Lite`,
  url:
    'https://tools.publicis.sapient.com/bitbucket-code-commons/projects/XTI/repos/universal-react/browse',
});

setDefaults({
  sectionOptions: {
    showSource: false,
    allowSourceToggling: false,
    showPropTables: false,
    allowPropTablesToggling: false,
  },
});

addDecorator((storyFn, context) => (
  <ThemeProvider theme={Theme}>{withConsole()(storyFn)(context)}</ThemeProvider>
));

setAddon(chaptersAddon);

const req = require.context('../src/components', true, /story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
