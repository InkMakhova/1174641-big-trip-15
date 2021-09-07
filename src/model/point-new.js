import {DEFAULT_TYPE} from '../constants.js';

export default class PointNew {
  initData() {
    return {
      type: DEFAULT_TYPE,
      offer: [],
      basePrice: 0,
    };
  }
}
