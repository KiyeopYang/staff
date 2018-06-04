import shopList from './shopList/saga';
import staffList from './staffList/saga';
import workList from './workList/saga';

export default [
  ...shopList,
  ...staffList,
  ...workList,
];
