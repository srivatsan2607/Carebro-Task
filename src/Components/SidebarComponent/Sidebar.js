import React, { useState } from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { faCoins, faCube, faCubes, faHome, faTachometerAlt, faUser, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { faFirstOrder, faJediOrder, faProductHunt } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles( ( theme ) => ( {
	sidebar: {
		width: "200px",
		position: "fixed",
		top: "70px",
		bottom: 0,
		overflow: "auto",
		borderRight: "1px solid #FFBF00 !important",
		visibility: "hidden",
		transition: "linear all 0.5s",
		[ theme.breakpoints.down( "sm" ) ]: {
			transition: "ease all 0.5s",
			zIndex: 222,
			left: "-250px",
			top: "55px",
		}
	},
	showSidebar: {
		[ theme.breakpoints.down( "sm" ) ]: {
			transition: "ease all 0.5s",
			marginTop: "20px",
			zIndex: 222,
			left: 0,
		}
	},
} ) )

const SideBar = () =>
{
	const classes = useStyles();
	const sideBarClass = [ classes.sidebar, " sidebar" ]
	const showSideBar = useSelector( ( state ) => state.CarebroSidebar.showSideBar );
	const [ activePage, setActivePage ] = useState( "Home" )
	if ( showSideBar )
	{
		sideBarClass.push( classes.showSidebar )
	}

	return (
		<div className={ sideBarClass.join( ' ' ) }>
			<div className="sidebar_wrapper">
				<div className="sidebar_menu">
					<h3 className="sidebar_title"><FontAwesomeIcon className="faSubtitleIcon"
						icon={ faTachometerAlt } /> Dashboard</h3>
					<ul className="sidebar_list">
						<Link to="/" className={ "sidebar_list_item " + ( activePage === "Home" ? "active" : " " ) }
							onClick={ () => setActivePage( "Home" ) }>
							<li className="sidebar_list_item"
							>
								<Link to="/">
									<FontAwesomeIcon className="faSidebarIcon"
										icon={ faHome } />
									Home
								</Link>
							</li>
						</Link>
						<Link to="/users" className={ "sidebar_list_item " + ( activePage === "Users" ? "active" : " " ) }
							onClick={ () => setActivePage( "Users" ) }>
							<li className="sidebar_list_item"
							>
								<Link to="/users">
									<FontAwesomeIcon className="faSidebarIcon"
										icon={ faUser } />
									Users
								</Link>
							</li>
						</Link>
						<h3 className="sidebar_title"> <FontAwesomeIcon className="faSubtitleIcon"
							icon={ faProductHunt } /> Products</h3>
						<Link to="/products" className={ "sidebar_list_item " + ( activePage === "AllProducts" ? "active" : " " ) }
							onClick={ () => setActivePage( "AllProducts" ) }>
							<li className="sidebar_list_item"
							>
								<Link to="/products">
									<FontAwesomeIcon className="faSidebarIcon"
										icon={ faCubes } />
									All Products
								</Link>
							</li>
						</Link>
						<Link to="/products/create" className={ "sidebar_list_item " + ( activePage === "CreateProduct" ? "active" : " " ) }
							onClick={ () => setActivePage( "CreateProduct" ) }>
							<li className="sidebar_list_item"
							>
								<Link to="/products/create">
									<FontAwesomeIcon className="faSidebarIcon"
										icon={ faCube } />
									Create Product
								</Link>
							</li>
						</Link>
						<h3 className="sidebar_title"> <FontAwesomeIcon className="faSubtitleIcon"
							icon={ faJediOrder } /> Orders</h3>
						<Link to="/allOrders" className={ "sidebar_list_item " + ( activePage === "AllOrders" ? "active" : " " ) }
							onClick={ () => setActivePage( "AllOrders" ) }>
							<li className="sidebar_list_item"
							>
								<Link to="/allOrders">
									<FontAwesomeIcon className="faSidebarIcon"
										icon={ faFirstOrder } />
									All Orders
								</Link>
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</div >
	)
}

export default SideBar
