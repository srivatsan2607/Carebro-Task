import React from 'react'
import { Visibility } from '@material-ui/icons'
import './UserList.css'
import { makeStyles } from '@material-ui/core'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';
import { useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles( ( theme ) => ( {
	users: {
		marginLeft: "200px",
		width: "calc(100% - 200px)",
		[ theme.breakpoints.down( "sm" ) ]: {
			width: "100%",
			marginLeft: 0,
		}
	}, root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	userName: {
		textTransform: "uppercase",
		fontSize: "18px",
	}
} ) )

const UserList = ( { userList } ) =>
{
	const classes = useStyles();

	return (
		<div className={ classes.users }>
			<div className="userList">
				<div className="heading">
					<div className="userList_title">All Users</div>
					<div className="userList_title create">Create User</div>
				</div>
				<Grid container spacing={ 3 } className="member_list">
					{
						userList.map( ( user ) => (
							<Grid item md={ 6 } xs={ 12 } key={ user.id }>
								<Card className={ classes.root }>
									<CardActionArea>
										<CardMedia
											className={ classes.media }
											image={ user.image }
											title="user"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2" className={ classes.userName }>
												{ user.name }
											</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions>
										<Link
											to={ {
												pathname: "/user/view/" + user.id,
												userDetails: user
											} }
										>
											<Button size="small"
												variant="contained"
												color="primary"
											>
												<Visibility className="userList_icon" />
												View
											</Button>
										</Link>
									</CardActions>
								</Card>
							</Grid>
						) )
					}
				</Grid>
			</div>
		</div>
	)
}

const mapPropsToState = ( state ) =>
{
	console.log( state )
	return {
		userList: state?.CarebroTaskUser?.usersList,
	}
}

//getAllCategories

export default connect( mapPropsToState, {} )( ( UserList ) );

