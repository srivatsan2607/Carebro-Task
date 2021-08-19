import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'


const NotAuthorized = () =>
{

	return (
		<div className="notAuthorized">
			{
				Swal.fire( {
					title: 'NOT AUTHORIZED',
					text: "Only admin has authorization to proceed",
					icon: 'warning',
					timer: 1000,
				} ).then( ( result ) =>
				{
					if ( result.isConfirmed || result.isDismissed )
					{
						window.location = "/products"
					}
				} )
			}
		</div>
	)
}

export default NotAuthorized
