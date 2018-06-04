import {
  createActionTypes,
  action,
} from '../../../../../../modules/reduxHelper';

export const actions = createActionTypes('ManagerPage/WorkManager/data/WorkCreate');
export const workCreate = {
  request: params => action(actions['REQUEST'], { params }),
  success: (params, response) => action(actions['SUCCESS'], { params, response }),
  failure: (params, error) => action(actions['FAILURE'], { params, error }),
};
