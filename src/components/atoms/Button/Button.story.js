import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import defaultConfig from './Button.mock';

// Import Styled Component to showcase variations
import Button, { ButtonVanilla } from '.';

storiesOf('Atoms', module).addWithChapters('Button', {
  chapters: [
    {
      sections: [
        {
          sectionFn: () => (
            <ButtonVanilla {...defaultConfig} className={`hide-default-sample ${defaultConfig.className}`} />
          ),
          options: {
            showSource: true,
            allowSourceToggling: true,
            showPropTables: true,
            allowPropTablesToggling: true,
          },
        },
      ],
    },
    {
      title: 'Primary Button Variations',
      sections: [
        {
          title: 'Variation Name',
          sectionFn: () => <Button {...defaultConfig} />,
        },
      ],
    },
  ],
});
