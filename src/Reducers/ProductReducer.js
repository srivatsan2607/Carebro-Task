const INITIAL_STATE = {
	productsList: [
		{
			id: 5,
			prodName: "Product 5",
			prodImage: "https://cdn.iconscout.com/icon/free/png-512/product-135-781070.png",
			prodPrice: "900",
			brand: "Amul"
		},
	],
	productLoader: false,
};

export const productReducer = ( state = INITIAL_STATE, action ) =>
{
	switch ( action.type )
	{
		case "ADD_PRODUCT":
			return {
				...state,
				productsList: [ ...state.productsList, action.payload.product ],
				productLoader: false
			};
		case "UPDATE_PRODUCT":
			const index = state.productsList.findIndex( product => product.id === action.payload.product.id );
			const newArray = [ ...state.productsList ];
			newArray[ index ].prodName = action.payload.product.prodName
			newArray[ index ].prodImage = action.payload.product.prodImage
			newArray[ index ].prodPrice = action.payload.product.prodPrice
			newArray[ index ].brand = action.payload.product.brand

			return {
				...state,
				productsList: newArray,
				productLoader: false,
			}
		case "DELETE_PRODUCT":
			const prodIndex = state.productsList.findIndex( product => product.id === action.payload.product.id );
			const newArray1 = state.productsList.filter( ( item, index ) => index !== prodIndex )
			return {
				...state,
				productsList: newArray1,
				productLoader: false
			}
		case "PRODUCT_LOADER":
			return {
				...state,
				productLoader: true,
			}
		default:
			return state;
	}
}

