import { combineReducers } from "redux";
import order from '../reducers/order';

export default () => 
   combineReducers({
      order,
   });
