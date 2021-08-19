import React from 'react'
import FeaturedInfo from './FeaturedComponent/FeaturedInfo'
import './Home.css'
import Chart from './ChartComponent/Chart'
import { userData } from '../../../constants'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles( ( theme ) => ( {
	homepage: {
		marginLeft: "200px",
		padding: "20px",
		[ theme.breakpoints.down( "sm" ) ]: {
			marginLeft: 0
		}
	}
} ) )

function HomePage ()
{
	const classes = useStyles();
	return (
		<div className={ classes.homepage }>
			<FeaturedInfo />
			<Chart data={ userData } title="User Analytics" grid dataKey="Active Users" />
		</div>
	)
}

export default HomePage
