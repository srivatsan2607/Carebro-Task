import { Route, Switch } from 'react-router-dom'
import SignUp from './Components/Pages/Authentication/SignUp/SignUp'
import Login from './Components/Pages/Authentication/Login/Login'
import Dashboard from './Components/DashboardComponent/Dashboard'
import ProtectedRoute from './ProtectedRoute'

function App ()
{
  return (
    <div className="app">

      <Switch>
        <Route path="/signup" exact component={ SignUp } />
        <Route path="/login" exact component={ Login } />
        <ProtectedRoute path="/" component={ Dashboard } />
      </Switch>
    </div>
  );
}

export default App;
