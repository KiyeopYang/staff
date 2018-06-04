import getWork from './getWork/saga';
import startWork from './startWork/saga';
import endWork from './endWork/saga';

export default [
  ...getWork,
  ...startWork,
  ...endWork,
];
