import workCreate from './workCreate/saga';
import workUpdate from './workUpdate/saga';
import workRemove from './workRemove/saga';

export default [
  ...workCreate,
  ...workUpdate,
  ...workRemove,
];
