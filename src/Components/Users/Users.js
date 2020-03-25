import React, { Component } from "react";
import UserItem from "./UserItem";
import Spinner from "../Layout/Spinner";

class Users extends Component {
  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div style={userStyle}>
          {this.props.users.map(user => {
            return <UserItem key={user.id} user={user} />;
          })}
        </div>
      );
    }
  }
}
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;
