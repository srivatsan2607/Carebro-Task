const initState = {
	showSideBar: false,
}


export const sidebarToggleReducer = ( state = initState, action ) =>
{
	switch ( action.type )
	{
		case "TOGGLE_SIDEBAR":
			return {
				...state,
				showSideBar: !state.showSideBar,
			};
		default:
			return state;
	}
};