import React, { useState } from 'react'
import './UserDetail.css'
import { CalendarToday, MailOutline, PermIdentity, PhoneAndroid, Visibility, Edit } from '@material-ui/icons'
import { connect } from 'react-redux';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import animationData from '../../../../assets/noOrders.json'
import Lottie from 'react-lottie';

const useStyles = makeStyles( ( theme ) => ( {
	root: {
		maxWidth: 200,
		border: "1px solid black",
		margin: "5px",
		padding: "10px"
	},
	media: {
		height: 100,
		width: 200,
	},
	productName: {
		textTransform: "uppercase",
		fontSize: "18px",
	},
	pos: {
		marginBottom: 12,
	},
	id: {
		color: "black",
		fontSize: "14px",
	},
	userDetail: {
		[ theme.breakpoints.down( "sm" ) ]: {
			marginLeft: 0,
			display: "flex",
			flexDirection: "column",
		}
	},
	notFound: {
		[ theme.breakpoints.down( "sm" ) ]: {
			margin: "50px ",
		}
	}
} ) );


const UserDetail = ( { initialValues, orderList, user } ) =>
{
	const userDetail = initialValues !== null ? initialValues : null;
	const userOrders = []
	const [ showUser, setShowUser ] = useState( true )
	const classes = useStyles();
	const [ orderProducts, setOrderProducts ] = useState( [] )
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};
	if ( userDetail !== null )
	{
		orderList.map( ( order ) =>
		{
			if ( order.userId === userDetail.id )
			{
				userOrders.push( order );
			}
		} )
	}
	return (
		<div>
			{
				userDetail !== null ? <div className={ classes.userDetail + " userDetail" }>
					{ showUser && <div className="show_user">
						<div className="user_details">
							<img src={ userDetail.image } alt="" className="user_image" />
							<div className="user_details_title">
								<span className="user_name">{ userDetail.name }</span>
							</div>
						</div>
						<div className="user_info">
							<span className="user_title">Account Details</span>
							<div className="show_info">
								<PermIdentity className="info_button" />
								<span className="info_title">{ userDetail.name }</span>
							</div>
							<div className="show_info">
								<CalendarToday className="info_button" />
								<span className="info_title">{ userDetail.dob }</span>
							</div>
							<span className="user_title">Contact Details</span>
							<div className="show_info">
								<PhoneAndroid className="info_button" />
								<span className="info_title"> +91 { userDetail.phone }</span>
							</div>
							<div className="show_info">
								<MailOutline className="info_button" />
								<span className="info_title">{ userDetail.email }</span>
							</div>
						</div>
						{ user.role === 0 || user.id === userDetail.id ? <Link
							to={ {
								pathname: "/user/edit/" + userDetail.id,
								userDetail: userDetail
							} }
						>
							<Button size="small"
								variant="contained"
								color="secondary"
							>
								<Edit className="userList_icon" />
								Edit
							</Button>
						</Link> : null }
					</div> }
					{ userOrders.length > 0 ? <div className="showOrders">
						<div className="orderList">
							{
								userOrders.map( ( order ) => (
									<Grid
										item xs={ 12 }
										onClick={ () =>
										{
											setShowUser( !showUser )
											setOrderProducts( order.products )
										} }
										key={ order.id }
									>
										<Card className={ classes.root }>
											<CardActionArea>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2">
														Order Id:
													</Typography>
													<Typography className={ classes.id } color="textSecondary">
														{ order.id }
													</Typography>
													<Typography className={ classes.pos } color="textSecondary">
														Order Date: { order.orderDate }
													</Typography>
													<Typography variant="body2" component="p">
														Total Amount: { order.amount }
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									</Grid>
								) )
							}
						</div>
						{ showUser === false && <div className="orderDetail">
							{
								orderProducts.map( ( product ) => (
									<Grid item xs={ 12 } key={ product.prodId }>
										<Card className={ classes.root }>
											<CardActionArea>
												<CardMedia
													className={ classes.media }
													image={ product.prodImage }
													title="product"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2" className={ classes.productName }>
														{ product.prodName }
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button size="small"
													variant="contained"
													color="secondary"
												>
													{ product.prodPrice }
												</Button>
											</CardActions>
										</Card>
									</Grid>
								) )
							}
						</div> }
					</div> : <div style={ { textAlign: "center" } }>
						<Lottie
							options={ defaultOptions }
							height={ 300 }
							width={ 400 }
						/>
						<h4>No Orders Yet</h4>
					</div> }

				</div> : <div className={ classes.notFound + " not_found" }>
					<p>User Details not found</p>
				</div>
			}
		</div>

	)
}


const mapPropsToState = ( state, ownProps ) =>
{
	return {
		initialValues: ownProps.location.userDetails ?? null,
		orderList: state?.CarebroOrders?.orderList,
		user: state?.CarebroTaskUser?.userData,
	}
}


export default connect(
	mapPropsToState,
	{}
)( UserDetail )


