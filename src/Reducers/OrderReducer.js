import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
	orderList: [
		{
			id: uuidv4(),
			userId: 1,
			orderDate: "14-10-2020",
			amount: "650",
			products: [
				{
					id: 1,
					prodName: "Product 1",
					prodImage: "https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-product-3.png",
					prodPrice: "200",
					brand: "Levis",
				},
				{
					id: 2,
					prodName: "Product 2",
					prodImage: "https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-product-3.png",
					prodPrice: "400",
					brand: "Nestle"
				}
			]
		},
		{
			id: uuidv4(),
			userId: 2,
			orderDate: "21-07-2021",
			amount: "650",
			products: [
				{
					id: 1,
					prodName: "Product 1",
					prodImage: "https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-product-3.png",
					prodPrice: "200",
					brand: "Levis"
				},
				{
					id: 2,
					prodName: "Product 2",
					prodImage: "https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-product-3.png",
					prodPrice: "400",
					brand: "Nestle"
				}
			]
		},
		{
			id: uuidv4(),
			userId: 1,
			orderDate: "16-08-2021",
			amount: "925",
			products: [
				{
					id: 3,
					prodName: "Product 4",
					prodImage: "https://cdn.iconscout.com/icon/free/png-512/product-135-781070.png",
					prodPrice: "900",
					brand: "Amul"
				},
			]
		}
	],
};

export const orderReducer = ( state = INITIAL_STATE, action ) =>
{
	switch ( action.type )
	{
		case "GET_ORDERS":
			return {
				...state,
			}
		default:
			return state;
	}
}

