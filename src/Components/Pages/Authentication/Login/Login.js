import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import Lottie from 'react-lottie'
import { connect, useDispatch } from 'react-redux'
import { Link, useHistory, withRouter } from 'react-router-dom'
import { defaultOptions } from '../../../../constants'
import './Login.css'

const Login = ( { userList, loading } ) =>
{
	const [ email, setEmail ] = useState( null )
	const [ password, setPassword ] = useState( null )
	const [ error, setError ] = useState( null )
	const dispatch = useDispatch()
	const history = useHistory()
	console.log( userList )

	const LoginHandler = () =>
	{
		if ( email !== null && email !== "" && password !== null && password !== "" )
		{
			const user = userList.find( ( user ) => user.email === email )
			if ( typeof user != "undefined" )
			{
				if ( user.password === password )
				{
					dispatch( { type: "USER_LOADER" } )
					setTimeout( () =>
					{
						dispatch( { type: "LOGIN_USER", payload: { user: user } } )
						history.push( "/" )
					}, 2000 );
				} else
				{
					setError( "Password does not match" )
				}
			} else
			{
				setError( "Email does not exist" )
			}
		}
	}

	return (
		<div className="login">
			{ loading === false ? <div className="login_container">
				<div className="phoneLogo">
					<span>
						<p>CareBro</p><FontAwesomeIcon className="faIcon"
							icon={ faHeartbeat } />
					</span>
				</div>
				<div className="user_login_details">
					<div className="user_login_item">
						<label>Email</label>
						<input type="text"
							name="email"
							value={ email }
							required
							onChange={ ( e ) =>
							{
								console.log( e )
								setEmail( e.target.value )
							} }
							placeholder="annabeck99@gmail.com"
							className="user_login_input" />
					</div>
					<div className="user_signup_item">
						<label>Password</label>
						<input type="password"
							value={ password }
							required
							onChange={ ( e ) => setPassword( e.target.value ) } placeholder="Password"
							className="user_login_input" />
					</div>
				</div>
				<button
					onClick={ LoginHandler }
					className="user_button"
				>
					Login
				</button>
				<div className="error">
					{ error }
				</div>
				<Link to="/signup">
					<label style={ { cursor: "pointer" } }>Create New Account ? </label>
				</Link>
			</div> : <Lottie
				options={ defaultOptions }
				height={ 400 }
				width={ 400 }
			/> }
		</div>
	)
}


const mapPropsToState = ( state ) =>
{
	return {
		userList: state?.CarebroTaskUser?.usersList,
		loading: state?.CarebroTaskUser?.userLoader
	}
}


export default connect(
	mapPropsToState,
	{}
)( withRouter( Login ) )

