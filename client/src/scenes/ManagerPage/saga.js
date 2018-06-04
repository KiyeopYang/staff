import saga from './data/saga';
import ShopManager from './scenes/ShopManager/saga';
import StaffManager from './scenes/StaffManager/saga';
import WorkManager from './scenes/WorkManager/saga';

export default [
  ...saga,
  ...ShopManager,
  ...StaffManager,
  ...WorkManager,
];
