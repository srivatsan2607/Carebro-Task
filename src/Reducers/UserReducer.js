import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
	isSignedIn: null,
	usersList: [
		{
			id: 1,
			name: "Srivatsan",
			email: "vatsan2607@gmail.com",
			phone: "8903909831",
			dob: "2001-07-26",
			password: "srivatsan",
			image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			role: 0,
		},
		{
			id: 2,
			name: "abishek",
			email: "abi@gmail.com",
			dob: "2000-05-10",
			phone: "9176234521",
			password: "abishek",
			image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			role: 1,
		},
		{
			id: 3,
			name: "Anirudh",
			dob: "2000-10-17",
			email: "ani@gmail.com",
			phone: "9876543212",
			password: "anirudh",
			image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			role: 0
		},
		{
			id: 4,
			name: "Maddy",
			email: "maddy@gmail.com",
			dob: "2001-04-19",
			phone: "8765432198",
			password: "Maddy",
			image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			role: 1
		},
	],
	userData: null,
	userLoader: false,
};

export const userReducer = ( state = INITIAL_STATE, action ) =>
{
	switch ( action.type )
	{
		case "USER_UPDATE":
			console.log( "action.payload>>>", action.payload );
			return {
				...state,
				isSignedIn: true,
				userList: action.payload.user,
				userError: null,
				userLoader: false,
			};
		case "UPDATE_SINGLE_USER":
			const index = state.usersList.findIndex( user => user.id === action.payload.user.id );
			const newArray = [ ...state.usersList ];
			newArray[ index ].name = action.payload.user.name
			newArray[ index ].email = action.payload.user.email
			newArray[ index ].dob = action.payload.user.dob
			newArray[ index ].phone = action.payload.user.phone
			newArray[ index ].image = action.payload.user.image
			return {
				...state,
				usersList: newArray,
				userLoader: false,
			}
		case "USER_LOADER":
			return {
				...state,
				userLoader: true,
				userError: null,
			}
		case "SIGNUP_USER":
			return {
				...state,
				usersList: [ ...state.usersList, action.payload.user ],
				userLoader: false,
				isSignedIn: true,
				userData: action.payload.user,
			}
		case "LOGIN_USER":
			return {
				...state,
				userLoader: false,
				isSignedIn: true,
				userData: action.payload.user,
			}
		case "USER_LOGOUT":
			return {
				...state,
				isSignedIn: null,
				userData: null,
				userLoader: false,
			}
		default:
			return state;
	}
}

