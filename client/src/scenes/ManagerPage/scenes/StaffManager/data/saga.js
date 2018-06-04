import staffCreate from './staffCreate/saga';
import staffUpdate from './staffUpdate/saga';
import staffRemove from './staffRemove/saga';

export default [
  ...staffCreate,
  ...staffUpdate,
  ...staffRemove,
];
