import React, { useEffect, useState } from 'react'
import './CreateProduct.css'
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom'
import { reduxForm, Field, change } from 'redux-form';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { productValidate, renderInput, defaultOptions } from '../../../../constants';
import Lottie from 'react-lottie';
import { v4 as uuidv4 } from 'uuid';

const useStyles1 = makeStyles( ( theme ) => ( {
	newProduct: {
		'& label': {
			color: "gray",
			fontWeight: 600,
			fontSize: "10px",
		},
		[ theme.breakpoints.down( "sm" ) ]: {
			marginLeft: 0
		}
	},
	input: {
		width: "100%",
		[ theme.breakpoints.up( "md" ) ]: {
			width: "60%",
		}
	},
} ) )



const CreateProduct = ( { loading, createForm, user } ) =>
{
	const classes1 = useStyles1();
	const history = useHistory();
	const valueset = [ "prodName", "prodPrice", "brand", "prodImage" ];
	const labels = [ "Product Name", "Product Price", " Product Brand", "Product Image" ]
	const dispatch = useDispatch();
	console.log( loading )
	const submitHandler = ( e ) =>
	{
		e.preventDefault();
		console.log( "Hello" )
		dispatch( { type: "PRODUCT_LOADER" } )
		const data = {
			id: uuidv4(),
			prodName: createForm.values.prodName,
			prodImage: createForm.values.prodImage,
			prodPrice: createForm.values.prodPrice,
			brand: createForm.values.brand,
		}
		setTimeout( () =>
		{
			dispatch( { type: "ADD_PRODUCT", payload: { product: data } } )
			history.push( '/products' )
		}, 2000 );
	}

	useEffect( () =>
	{
		console.log( user.role )
		if ( user.role !== 0 )
		{
			console.log( "Inside" );
			return < Redirect to="/notAuthorized" />
		}
	}, [] )

	return (
		<div>
			{ user.role === 0 ? <div className={ classes1.newProduct + " new_product" }>
				<div className="product_title_container">
					<h1 className="product_title">Create Product</h1>
					<Link to="/products">
						<button className="product_button">All Products</button>
					</Link>
				</div>
				{ loading === false ? <div className="add_product">
					<form className={ classes1.productForm + " add_prod_form" } >
						{
							valueset.map( ( key, index ) => (
								<div>
									<label>{ labels[ index ].toUpperCase() }</label>
									<Field
										key={ key }
										className={ classes1.input }
										name={ key }
										required
										label={ labels[ index ] }
										component={ renderInput }>
									</Field>
								</div>
							) )
						}
						<button
							className="product_button"
							onClick={ ( e ) => submitHandler( e ) }
						>
							Create
						</button>
					</form>
				</div> : <Lottie
					options={ defaultOptions }
					height={ 400 }
					width={ 400 }
				/> }
			</div> : < Redirect to="/notAuthorized" /> }
		</div>
	)
}

const mapPropsToState = ( state ) =>
{
	console.log( state )
	console.log( state?.CarebroProducts?.productLoader )
	return {
		loading: state?.CarebroProducts?.productLoader,
		createForm: state?.form?.createProductForm,
		user: state?.CarebroTaskUser.userData,
	};
};



const exportComponent = withRouter( connect(
	mapPropsToState, {}
)( CreateProduct ) )

export default reduxForm( {
	form: 'createProductForm',
	validate: productValidate,
} )( exportComponent )

