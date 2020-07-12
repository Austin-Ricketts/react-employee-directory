import React, { Component } from "react";
import API from "../utils/API";

export default class Persons extends Component {
  state = {
    users: [],
    filtered: []
  };

  componentDidMount() {
    API.getPerson()
      .then(res => 
        {
          this.setState({ users: res.data.results })
          console.log(res);
          console.log(this.state.users);
        })
        

      .catch(err => console.log(err));
      setTimeout(console.log(this.state.users), 1000);
  }

  handlesearchChange = filtered => {
    //this will be fired when the user clicks the textbox - input field
    this.setState({ users: filtered });
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
                {this.state.users.map(({ name, login, phone, email, dob }) => {
                  return (
                    <tr key={login.uuid}>
                      <td data-th="Name" className="name-cell align-middle">
                            {name.first} {name.last}
                      </td>
                      <td data-th="Phone" className="name-cell align-middle">
                            {phone}
                      </td>
                      <td data-th="Email" className="name-cell align-middle">
                            {email}
                      </td>
                      <td data-th="DOB" className="name-cell align-middle">
                            {dob.date}
                      </td>
                    </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

