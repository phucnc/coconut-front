import React from 'react';
import { storiesOf } from '@storybook/react';
import { ModalUser } from './index';

storiesOf('Components|organisms/ModalUser', module).add('normal', () => (
  <ModalUser isOpen handleClose={() => {}}>
    Sample test
  </ModalUser>
));
