import React from 'react'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import './FeaturedInfo.css'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles( ( theme ) => ( {
	featured: {
		[ theme.breakpoints.down( "sm" ) ]: {
			marginLeft: 0,
			display: "flex",
			flexDirection: "column",
		},
		'& .featured_item': {
			[ theme.breakpoints.down( "sm" ) ]: {
				marginTop: "20px",
			},
		}
	}
} ) )


const FeaturedInfo = () =>
{
	const classes = useStyles();
	return (
		<div className={ classes.featured + " featured" }>
			<div className="featured_item">
				<span className="featured_title">Revenue</span>
				<div className="featured_money_container">
					<span className="featured_money">$2,415</span>
					<span className="featured_money_rate">-11.5 <ArrowDownward className="featured_icon negative" /></span>
				</div>
				<span className="featured_sub">Comapared to last month</span>
			</div>
			<div className="featured_item">
				<span className="featured_title">Sale</span>
				<div className="featured_money_container">
					<span className="featured_money">$4,415</span>
					<span className="featured_money_rate">-12.5 <ArrowDownward className="featured_icon negative" /></span>
				</div>
				<span className="featured_sub">Comapared to last month</span>
			</div>
			<div className="featured_item">
				<span className="featured_title">Cost</span>
				<div className="featured_money_container">
					<span className="featured_money">$2,000</span>
					<span className="featured_money_rate">11.5 <ArrowUpward className="featured_icon " /></span>
				</div>
				<span className="featured_sub">Comapared to last month</span>
			</div>
		</div>
	)
}

export default FeaturedInfo
