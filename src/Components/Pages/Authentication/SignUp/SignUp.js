import React, { useState } from 'react'
import './SignUp.css'
import { makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import bg from '../../../../assets/background.png'
import { Calendar } from 'react-date-range'
import Lottie from 'react-lottie'
import { defaultOptions } from '../../../../constants'
import { connect, useDispatch } from 'react-redux'
import { v4 as uuidV4 } from 'uuid'
import { format } from 'date-fns/esm'
import { withRouter, useHistory, Link } from 'react-router-dom'


const useStyles = makeStyles( ( theme ) => ( {
	signBoard: {
		flex: 2,
		backgroundImage: `url(${bg})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		height: '100%',
		[ theme.breakpoints.down( "sm" ) ]: {
			display: 'none'
		}
	},
	signupContainer: {
		flex: 3,
		backgroundColor: '#F1E8E6',
		padding: "20px",
		overflowX: "hidden !important",
	},
} ) )

const SignUp = ( { loading } ) =>
{
	const classes = useStyles();
	const [ name, setName ] = useState( null )
	const [ phone, setPhone ] = useState( null )
	const [ email, setEmail ] = useState( null )
	const [ dob, setDob ] = useState( null )
	const [ role, setRole ] = useState( 0 )
	const [ image, setImage ] = useState( null )
	const [ password, setPassword ] = useState( null )
	const dispatch = useDispatch()
	const history = useHistory()

	const submitHandler = ( e ) =>
	{
		e.preventDefault();
		if ( name !== null && name !== "" && phone !== null && phone !== "" && email !== null && email !== "" && dob !== null && image !== null && password !== null && password !== "" )
		{
			dispatch( { type: "USER_LOADER" } );
			const data = {
				id: uuidV4(),
				image: image,
				name: name,
				dob: format( new Date( dob ), "yyyy-MM-dd" ),
				phone: phone,
				email: email,
				role: role,
				password: password,
			}
			setTimeout( () =>
			{
				dispatch( { type: "SIGNUP_USER", payload: { user: data } } )
				history.push( "/" )
			}, 2000 );
		}
	}

	return (
		<div className="signUp">
			<div className={ classes.signBoard }>
				<div className="title">
					<h3>Welcome to Carebro Ecommerce</h3>
					<div className="phoneLogo">
						<span>
							<p>C</p><FontAwesomeIcon className="faIcon"
								icon={ faHeartbeat } />
						</span>
					</div>
				</div>
			</div>
			<div className={ classes.signupContainer }>
				<div className="text">
					<h6>Hello! Tell us a little bit about yourself.</h6>
					<Link to="/login">
						<p style={ { cursor: "pointer", fontSize: "12px", color: "gray" } }>Already have account ? </p>
					</Link>
				</div>
				{ loading === false ? <div className="signup_container">
					<form className="signup_form">
						<div className="user_signup_details">
							<div className="user_signup_item">
								<label>Name</label>
								<input type="text"
									name="name"
									value={ name }
									onChange={ ( e ) =>
									{
										console.log( e )
										setName( e.target.value )
									} }
									placeholder="Anna Becker"
									className="user_signup_input" />
							</div>
							<div className="user_signup_item">
								<label>Email</label>
								<input type="email"
									value={ email }
									onChange={ ( e ) => setEmail( e.target.value ) } placeholder="annabeck99@gmail.com"
									className="user_signup_input" />
							</div>
							<div className="user_signup_item">
								<label>Phone Number</label>
								<input type="number"
									value={ phone }
									onChange={ ( e ) => setPhone( e.target.value ) }
									placeholder="9877654321"
									className="user_signup_input" />
							</div>
							<div className="user_signup_item">
								<label>Date of Birth</label>
								<Calendar
									date={ dob }
									className="calendar"
									onChange={ ( date ) =>
									{
										setDob( date )
									} }
									color="#c7ca35"
								/>
							</div>
							<div className="user_signup_item">
								<label>Profile Image</label>
								<input type="text"
									value={ image }
									onChange={ ( e ) => setImage( e.target.value ) }
									placeholder="Profile picture"
									className="user_signup_input" />
							</div>
							<div className="user_signup_item">
								<label>Profile Image</label>
								<select
									value={ role }
									className="user_signup_input"
									onChange={ ( e ) => setRole( parseInt( e.target.value ) ) }
								>
									<option value="0">Admin</option>
									<option value="1">User</option>
								</select>
							</div>
							<div className="user_signup_item">
								<label>Password</label>
								<input type="password"
									value={ password }
									onChange={ ( e ) => setPassword( e.target.value ) }
									placeholder="Password"
									className="user_signup_input" />
							</div>

						</div>
						<button
							className="user_button"
							onClick={ ( e ) => submitHandler( e ) }
						>
							Sign Up
						</button>
					</form>
				</div> : <Lottie
					options={ defaultOptions }
					height={ 400 }
					width={ 400 }
				/> }
			</div>
		</div>
	)
}

const mapPropsToState = ( state ) =>
{
	return {
		loading: state?.CarebroTaskUser?.userLoader
	}
}


export default connect(
	mapPropsToState,
	{}
)( withRouter( SignUp ) )

