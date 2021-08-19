import React, { useState } from 'react'
import './EditUserPage.css'
import { Link } from 'react-router-dom'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { format } from 'date-fns/esm';
import { connect, useDispatch } from 'react-redux';
import Lottie from 'react-lottie';
import { defaultOptions } from '../../../../constants';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( ( theme ) => ( {
	editUser: {
		[ theme.breakpoints.down( "sm" ) ]: {
			marginLeft: 0
		}
	},
	form: {
		[ theme.breakpoints.down( "sm" ) ]: {
			display: "flex",
			flexDirection: "column",
		}
	}
} ) )

const EditUserPage = ( { initialValues, userLoader } ) =>
{
	const { name, email, dob, phone, image, id } = initialValues
	const [ userName, setUserName ] = useState( name )
	const [ userEmail, setUserEmail ] = useState( email )
	const [ userDob, setUserDob ] = useState( new Date( dob ) )
	const [ userPhone, setUserPhone ] = useState( phone )
	const [ userImage, setUserImage ] = useState( image )
	const [ userId, setUserId ] = useState( id )
	const classes = useStyles()

	const dispatch = useDispatch();

	const submitHandler = () =>
	{
		dispatch( { type: "USER_LOADER" } );
		const data = {
			id: userId,
			image: userImage,
			name: userName,
			dob: format( new Date( userDob ), "yyyy-MM-dd" ),
			phone: userPhone,
			email: userEmail,
		}
		setTimeout( () =>
		{
			dispatch( { type: "UPDATE_SINGLE_USER", payload: { user: data } } )
		}, 2000 );
	}

	return (
		<div className={ classes.editUser + " edituser" }>
			<div className="edituser_title_container">
				<h1 className="edituser_title">Edit User</h1>
				<Link to="/users">
					<button className="add_user_button">All users</button>
				</Link>
			</div>
			<div className="edituser_container">
				<div className="update_user">
					{ userLoader === false ?
						<form className={ classes.form + " user_update_form" } onsubmit="return false">
							<div className="user_update_details">
								<span className="update_title">Edit</span>
								<div className="user_update_item">
									<label>Name</label>
									<input type="text"
										name="name"
										value={ userName }
										onChange={ ( e ) =>
										{
											console.log( e )
											setUserName( e.target.value )
										} }
										placeholder="Anna Becker"
										className="user_update_input" />
								</div>
								<div className="user_update_item">
									<label>Email</label>
									<input type="email"
										value={ userEmail }
										onChange={ ( e ) => setUserEmail( e.target.value ) } placeholder="annabeck99@gmail.com"
										className="user_update_input" />
								</div>
								<div className="user_update_item">
									<label>Phone Number</label>
									<input type="number"
										value={ userPhone }
										onChange={ ( e ) => setUserPhone( e.target.value ) }
										placeholder="9877654321"
										className="user_update_input" />
								</div>
								<div className="user_update_item">
									<label>Date of Birth</label>
									<Calendar
										style={ { width: "100%" } }
										date={ userDob }
										onChange={ ( date ) =>
										{
											setUserDob( date )
										} }
										color="#c7ca35"
									/>
								</div>
							</div>
							<div className="user_update_picture">
								<div className="user_update_upload">
									<img src={ userImage } alt="" className="user_update_img" />
									<div className="user_update_item">
										<label>Profile Picture</label>
										<input type="text"
											value={ userImage }
											onChange={ ( e ) => setUserImage( e.target.value ) }
											placeholder="Paste URL here"
											className="user_update_input" />
									</div>
								</div>
								<br />
								<button
									onClick={ submitHandler } className="user_update_button">Update</button>
							</div>
						</form> : <Lottie
							options={ defaultOptions }
							height={ 400 }
							width={ 400 }
						/> }
				</div>
			</div>
		</div>
	)
}

const mapPropsToState = ( state, ownProps ) =>
{
	const userDetails = ownProps.location.userDetail ?? null;
	const values = {
		"name": userDetails !== null ? userDetails[ "name" ] : null,
		"email": userDetails !== null ? userDetails[ "email" ] : null,
		"dob": userDetails !== null ? userDetails[ "dob" ] : null,
		"phone": userDetails !== null ? userDetails[ "phone" ] : null,
		"image": userDetails !== null ? userDetails[ "image" ] : null,
		"id": userDetails !== null ? userDetails[ "id" ] : null,
	}
	return {
		initialValues: values,
		userLoader: state?.CarebroTaskUser?.userLoader
	}
}


export default connect(
	mapPropsToState,
	{}
)( EditUserPage )

