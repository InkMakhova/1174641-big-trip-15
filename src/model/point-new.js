import {defaultType} from '../constants.js';

export default class PointNew {
  initData() {
    return {
      type: defaultType,
      offer: [],
      basePrice: 0,
    };
  }
}
