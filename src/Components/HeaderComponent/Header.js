import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Link, useHistory, withRouter } from 'react-router-dom';
import './Header.css'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch } from 'react-redux';

const useStyles = makeStyles( ( theme ) => ( {
	logo: {
		fontWeight: "bold",
		fontSize: "30px",
		color: "#FFBF00",
		cursor: "pointer",
		[ theme.breakpoints.down( "sm" ) ]: {
			display: 'none',
		}
	},
	phoneLogo: {
		fontSize: "30px",
		color: "#FFBF00",
		cursor: "pointer",
		border: "1px solid white",
		padding: "10px",
		borderRadius: "10px",
		[ theme.breakpoints.up( "md" ) ]: {
			display: 'none',
		}
	},
	topLeft: {
		'& div': {
			marginLeft: "30px",
			lineHeight: 0.7,
			[ theme.breakpoints.down( "sm" ) ]: {
				marginLeft: 0,
			}
		},
		'& .logo__text': {
			[ theme.breakpoints.down( "sm" ) ]: {
				display: 'none',
			}
		}
	}
} ) )

const Header = ( { user } ) =>
{
	const classes = useStyles();
	const [ open, setOpen ] = useState( false )
	const dispatch = useDispatch()
	const history = useHistory()
	const DropdownItem = ( props ) =>
	{
		return (
			<button onClick={ props.clickHandler } className="menu-item">
				{ props.children }
			</button>
		);
	}
	const LogoutHandler = () =>
	{
		console.log( "Logout handler" )
		dispatch( { type: "USER_LOGOUT" } )
		history.push( "/login" )
	}

	return (
		<div className="header">
			<div className="header_wrapper">
				<div className={ classes.topLeft }>
					<span className={ classes.logo + " logo__text" }>CareBro</span>
					<div className={ classes.phoneLogo } onClick={ () => dispatch( { type: "TOGGLE_SIDEBAR" } ) }>
						<span>
							C<FontAwesomeIcon className="faIcon"
								icon={ faHeartbeat } />
						</span>
					</div>
				</div>
				<div className="top_right">
					<img
						src={ user.image }
						alt=""
						className="app_avatar"
						onClick={ () => setOpen( !open ) } />
					<h4>{ user.name }</h4>
					{ open && <div className="dropdown">
						<Link to={
							{
								pathname: `/user/view/${user.id}`,
								userDetails: user,
							}
						}>
							<DropdownItem>Profile</DropdownItem>
						</Link>
						<DropdownItem clickHandler={ LogoutHandler }>Log out</DropdownItem>
					</div> }
				</div>
			</div>
		</div>
	)
}

const mapPropsToState = ( state ) =>
{
	return {
		user: state?.CarebroTaskUser?.userData
	}
}


export default connect(
	mapPropsToState,
	{}
)( withRouter( Header ) )

