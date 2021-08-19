import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../HeaderComponent/Header';
import Sidebar from '../SidebarComponent/Sidebar';
import UserList from '../Pages/Users/UserList/UserList';
import UserDetail from '../Pages/Users/UserDetail/UserDetail';
import EditUserPage from '../Pages/Users/EditUser/EditUserPage';
import ProductsList from '../Pages/Products/ProductsList/ProductsList';
import CreateProduct from '../Pages/Products/CreateProduct/CreateProduct';
import EditProduct from '../Pages/Products/EditProduct/EditProduct';
import NotAuthorized from '../Pages/NotAuthorized';
import AllOrders from '../Pages/Orders/AllOrders';
import HomePage from '../Pages/HomePage/Home';

function Dashboard ()
{
	return (
		<div>
			<Router>
				<Header />
				<Sidebar />
				<div className="main_content">
					<Switch>
						<Route exact path="/users" component={ UserList } />
						<Route exact path="/user/view/:user_id" component={ UserDetail } />
						<Route exact path="/user/edit/:user_id" component={ EditUserPage } />
						<Route exact path="/products" component={ ProductsList } />
						<Route exact path="/products/create" component={ CreateProduct } />
						<Route exact path="/products/edit/:prod_id" component={ EditProduct } />
						<Route exact path="/notAuthorized" component={ NotAuthorized } />
						<Route exact path="/allOrders" component={ AllOrders } />
						<Route exact path="/" component={ HomePage } />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default Dashboard;
