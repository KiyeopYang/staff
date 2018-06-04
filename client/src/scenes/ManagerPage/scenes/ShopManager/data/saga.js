import shopCreate from './shopCreate/saga';
import shopUpdate from './shopUpdate/saga';
import shopRemove from './shopRemove/saga';

export default [
  ...shopCreate,
  ...shopUpdate,
  ...shopRemove,
];
