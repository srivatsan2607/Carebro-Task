import React, { useEffect, useState } from 'react'
import './EditProduct.css'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { reduxForm, Field, change } from 'redux-form';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { productValidate, renderInput, defaultOptions } from '../../../../constants';
import Lottie from 'react-lottie';
import { v4 as uuidv4 } from 'uuid';

const useStyles1 = makeStyles( ( theme ) => ( {
	editProduct: {
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
			width: "100%",
		}
	},
	productForm: {
		[ theme.breakpoints.down( "sm" ) ]: {
			display: "flex",
			flexDirection: "column"
		}
	}
} ) )

const EditProduct = ( { loading, editForm, initialValues } ) =>
{
	const classes1 = useStyles1();
	const history = useHistory();
	const valueset = [ "prodName", "prodPrice", "brand" ];
	const labels = [ "Product Name", "Product Price", " Product Brand" ]
	const dispatch = useDispatch();
	const { id, prodImage } = initialValues
	const submitHandler = ( e ) =>
	{
		e.preventDefault();
		dispatch( { type: "PRODUCT_LOADER" } )
		const data = {
			id: id,
			prodName: editForm.values.prodName,
			prodImage: editForm.values.prodImage,
			prodPrice: editForm.values.prodPrice,
			brand: editForm.values.brand,
		}
		setTimeout( () =>
		{
			dispatch( { type: "UPDATE_PRODUCT", payload: { product: data } } )
			history.push( '/products' )
		}, 2000 );
	}

	return (
		<div className={ classes1.editProduct + " edit_product" }>
			<div className="product_title_container">
				<h1 className="product_title">Edit Product</h1>
				<Link to="/products">
					<button className="product_button">All Products</button>
				</Link>
			</div>
			{ loading === false ? <div className="edit_product_container">
				<form className={ classes1.productForm + " edit_prod_form" } >
					<div>
						{
							valueset.map( ( key, index ) => (
								<div>
									<label>{ labels[ index ].toUpperCase() }</label>
									<div className="input_fields">
										<Field
											key={ key }
											className={ classes1.input }
											name={ key }
											required
											label={ labels[ index ] }
											component={ renderInput }>
										</Field>
									</div>
								</div>
							) )
						}
					</div>
					<div className="product_update_picture">
						<div>
							<img src={ prodImage != null ? prodImage : "https://www.nicepng.com/png/detail/304-3048415_business-advice-product-icon-png.png" } alt="" className="product_update_img" />
							<Field
								key="prodImage"
								className={ classes1.input }
								name="prodImage"
								required
								label="Product Image"
								component={ renderInput }>
							</Field>
						</div>
						<br />
						<button
							className="product_button"
							onClick={ ( e ) => submitHandler( e ) }
						>
							Update
						</button>
					</div>
				</form>
			</div> : <Lottie
				options={ defaultOptions }
				height={ 400 }
				width={ 400 }
			/> }
		</div>
	)
}

const mapPropsToState = ( state, ownProps ) =>
{
	console.log( state )
	console.log( ownProps )
	console.log( state?.CarebroProducts?.productLoader )
	const productData = ownProps.location.prodDetails != null ? ownProps.location.prodDetails : null;
	const values = {
		prodName: productData != null ? productData.prodName : null,
		prodImage: productData != null ? productData.prodImage : null,
		id: productData != null ? productData.id : null,
		prodPrice: productData != null ? productData.prodPrice : null,
		brand: productData != null ? productData.brand : null,
	}
	console.log( productData )
	return {
		initialValues: values,
		loading: state?.CarebroProducts?.productLoader,
		editForm: state?.form?.EditProductForm,
	};
};



export default connect(
	mapPropsToState,
	{}
)( reduxForm( {
	form: 'EditProductForm', // a unique identifier for this form
	enableReinitialize: true,
	validate: productValidate,
} )( withRouter( EditProduct ) ) )

