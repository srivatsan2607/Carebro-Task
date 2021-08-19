import React, { useEffect, useState } from 'react'
import './ProductsList.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Lottie from 'react-lottie';
import { defaultOptions } from '../../../../constants';
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles( ( theme ) => ( {
	productList: {
		[ theme.breakpoints.down( "sm" ) ]: {
			marginLeft: 0
		}
	},
	editButton: {
		backgroundColor: "gray",
	},
	deleteButton: {
		color: "gray"
	}
} ) )

const ProductsList = ( { productList, productLoader, user } ) =>
{
	const dispatch = useDispatch()
	const classes = useStyles()
	const deleteHandler = ( id ) =>
	{
		if ( user.role === 0 )
		{
			Swal.fire( {
				title: 'Are you sure?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes, delete it!',
				cancelButtonText: 'No, keep it'
			} ).then( ( result ) =>
			{
				if ( result.isConfirmed )
				{
					dispatch( { type: "PRODUCT_LOADER" } )
					setTimeout( () =>
					{
						dispatch( { type: "DELETE_PRODUCT", payload: { product: { id: id } } } )
					}, 1000 );
					Swal.fire(
						'Deleted!',
						'Your product has been deleted.',
						'success'
					)
				}
			} )
		}
	}

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 100
		},
		{
			field:
				'prodImage',
			headerName: 'Product',
			width: 200,
			renderCell: ( params ) =>
			{
				return (
					<div className="product_list_product">
						<img src={ params.row.prodImage } alt="" />
						{ params.row.prodName }
					</div>
				)
			}
		},
		{
			field: 'brand',
			headerName: 'Brand',
			width: 150
		},
		{
			field: 'prodPrice',
			headerName: 'Price',
			renderCell: ( params ) =>
			{
				return (
					<div>
						₹{ params.row.prodPrice }
					</div>
				)
			},
			width: 160,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: ( params ) =>
			{
				return (
					<div className="action_buttons">
						<Link to={
							user.role === 0 ? {
								pathname: "/products/edit/" + params.row.id,
								prodDetails: params.row,
							} : {}
						}>
							<button
								className={ ( user.role === 0 ? "" : classes.editButton ) + " product_list_buttons_edit" }
							>
								Edit
							</button>
						</Link>
						<DeleteOutline
							className={ ( user.role === 0 ? "" : classes.deleteButton ) + " product_list_buttons_delete" }
							onClick={ e => deleteHandler( params.row.id ) }
						/>
					</div >
				)
			}
		}
	];


	return (
		productLoader == false ? <div className={ classes.productList + " product_list" }>
			<div className="product_tile_container" >
				<Link to="/products/create" > <button className="create_button" > Create Product </button> </Link>
			</div>
			<DataGrid
				className="dataGrid"
				rows={ productList }
				disableSelectionOnClick
				columns={ columns }
				pageSize={ 8 }
				autoHeight
				checkboxSelection
			/>
		</div> : <Lottie
			options={ defaultOptions }
			height={ 400 }
			width={ 400 }
		/>
	)
}

const mapPropsToState = ( state ) =>
{
	console.log( state?.CarebroProducts?.productsList )
	return {
		productList: state?.CarebroProducts?.productsList,
		productLoader: state?.CarebroProducts?.productLoader,
		user: state?.CarebroTaskUser?.userData,
	}
}

export default connect( mapPropsToState, {} )( ( withRouter( ProductsList ) ) );