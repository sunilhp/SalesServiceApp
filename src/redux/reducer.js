import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import reviews from '../modules/reviews/ReviewsState';
import navigationType from '../modules/navigationType/NavigationTypeState';
import serviceType from '../modules/serviceType/ServiceTypeState';
import productType from '../modules/productType/ProductTypeState';
import users from '../modules/users/UsersState';
import customer from '../modules/customer/CustomerState';
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import charts from '../modules/charts/ChartsState';
import chat from '../modules/chat/ChatState';
import leads from '../modules/leads/LeadState';
import services from '../modules/services/ServiceState';

export default combineReducers({
 // ## Generator Reducers
 reviews,
 navigationType,
 serviceType,
 productType,
 users,
 customer,
 gallery,
 app,
 calendar,
 charts,
 leads,
 chat,
 services,
});
