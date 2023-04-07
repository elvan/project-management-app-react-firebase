import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages & components
import Navbar from './components/Navbar';
import OnlineUsers from './components/OnlineUsers';
import Sidebar from './components/Sidebar';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Switch>
              <Route exact path='/'>
                {!user && <Redirect to='/login' />}
                {user && <Dashboard />}
              </Route>
              <Route path='/create'>
                {!user && <Redirect to='/login' />}
                {user && <Create />}
              </Route>
              <Route path='/projects/:id'>
                {!user && <Redirect to='/login' />}
                {user && <Project />}
              </Route>
              <Route path='/login'>
                {user && <Redirect to='/' />}
                {!user && <Login />}
              </Route>
              <Route path='/signup'>
                {user && user.displayName && <Redirect to='/' />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
