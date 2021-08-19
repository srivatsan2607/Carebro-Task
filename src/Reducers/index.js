import { combineReducers } from "redux";
import { reducer } from "redux-form";
import { userReducer } from "./UserReducer";
import { orderReducer } from "./OrderReducer";
import { productReducer } from "./ProductReducer";
import { sidebarToggleReducer } from "./SidebarToggleReducer";

const appReducer = combineReducers( {
	CarebroTaskUser: userReducer,
	CarebroOrders: orderReducer,
	form: reducer,
	CarebroProducts: productReducer,
	CarebroSidebar: sidebarToggleReducer,
} );

const rootReducer = ( state, action ) =>
{
	return appReducer( state, action );

};

export default rootReducer;