import React, { useEffect, useState } from 'react'
import './AllOrders.css'
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles( ( theme ) => ( {
	ordersList: {
		[ theme.breakpoints.down( "sm" ) ]: {
			marginLeft: 0
		}
	},
} ) )

const AllOrders = ( { ordersList } ) =>
{
	const classes = useStyles()

	const columns = [
		{
			field: 'id',
			headerName: 'Order ID',
			width: 200
		},
		{
			field: 'userId',
			headerName: 'User ID',
			width: 180
		},
		{
			field: 'orderDate',
			headerName: 'Order Date',
			width: 150
		},
		{
			field: 'products',
			headerName: 'Number of products',
			renderCell: ( params ) =>
			{
				return (
					<div>
						{ params.row.products.length }
					</div>
				)
			},
			width: 220
		},
		{
			field: 'amount',
			headerName: 'Total Amount',
			renderCell: ( params ) =>
			{
				return (
					<div>
						₹{ params.row.amount }
					</div>
				)
			},
			width: 200,
		},
	];


	return (
		<div className={ classes.ordersList + " orders_list" }>
			<div className="orders_title_container" >
				<h4>All Orders Placed</h4>
			</div>
			<DataGrid
				className="dataGrid"
				rows={ ordersList }
				disableSelectionOnClick
				columns={ columns }
				pageSize={ 8 }
				autoHeight
				checkboxSelection
			/>
		</div>
	)
}

const mapPropsToState = ( state ) =>
{
	console.log( state?.CarebroProducts?.productsList )
	return {
		ordersList: state?.CarebroOrders?.orderList,
	}
}

export default connect( mapPropsToState, {} )( ( withRouter( AllOrders ) ) );