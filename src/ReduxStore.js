// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./Reducers";
import { createStore, applyMiddleware, compose } from 'redux';

const saveToLocalStorage = ( state ) =>
{
	try
	{
		const serializedState = JSON.stringify( state );
		localStorage.setItem( "state", serializedState );
	} catch ( e )
	{
		console.log( e );
	}
}

const fetchFromLocalStorage = () =>
{
	try
	{
		const serializedState = localStorage.getItem( "state" );
		if ( serializedState === null )
		{
			throw new Error();
		}
		return JSON.parse( serializedState );
	} catch ( e )
	{
		return undefined;
	}
}

const state = fetchFromLocalStorage();
console.log( "state>>>>>", state );
if ( state !== undefined && state !== null )
{
	console.log( "state>>>>>", state );
	state.CarebroTaskUser.userLoader = false;
	state.CarebroProducts.productLoader = false;
	delete state.form;
	delete state.CarebroSidebar
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer, state, composeEnhancers(
	applyMiddleware( thunk )
) );


// const store = createStore( reducer,  state, applyMiddleware( thunk ));

store.subscribe( () =>
{
	saveToLocalStorage( store.getState() )
} );

export default store;