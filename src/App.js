import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Axios from "axios";
import About from "./Components/Pages/About";
import Search from "./Components/Users/Search";
import Alert from "./Components/Layout/Alert";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Initialize User fetch on home
  useEffect(() => {
    setLoading("true");

    Axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  // Searching Request
  const searchUsers = text => {
    setLoading("true");

    Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(res => {
      setUsers(res.data.items);
      setLoading(false);
    });
  };

  // Get SINGLE USER
  const getUser = username => {
    setLoading("true");

    Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(res => {
      setUser(res.data);
      setLoading(false);
    });
  };

  //Get User Repos
  const getUserRepos = username => {
    setLoading("true");

    Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:acc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    ).then(res => {
      setRepos(res.data);
      setLoading(false);
    });
  };

  // CLearing Users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Alert

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
