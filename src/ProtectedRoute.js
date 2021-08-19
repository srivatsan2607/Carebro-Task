import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


function ProtectedRoute ( { component: Component, ...rest } )
{
	const isAuthenticated = useSelector( ( state ) => state?.CarebroTaskUser?.isSignedIn );

	console.log( "Protected Route isAuthenticated typeee>>>", typeof isAuthenticated );


	console.log( "Protected Route isAuthenticated>>>", isAuthenticated );
	return (
		<Route { ...rest } render={
			props =>
			{
				if ( isAuthenticated !== null && isAuthenticated === true )
				{
					return <Component { ...props } />
				} else
				{
					return <Redirect to="/login" />
				}
			}
		} />
	)
}


export default ProtectedRoute
