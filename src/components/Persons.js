import React, { Component } from "react";
import API from "../utils/API";

export default class Persons extends Component {
  state = {
    search: " ",
    users: [],
    filtered: [],
    alphasort: []
  };

  componentDidMount() {
    API.getPerson()
      .then(res => 
        {
          this.setState({ users: res.data.results })
          console.log(this.state.users);
        })
        

      .catch(err => console.log(err));
      setTimeout(console.log(this.state.users), 1000);
  }

  handlesearchChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const result = this.state.users.filter(user => { 
      console.log(user);
      let name = user.name.first;
      return name.indexOf(this.state.search.toLowerCase()) !== -1})
    console.log(this.state.users);
    console.log(result);
    console.log(this.state.search);
        this.setState({filtered: result});
        // console.log(res.data.results);
        // console.log(this.state.search);
        // console.log(this.state.filtered);
      
  };

  handleSortAlphabet = event => {
    event.preventDefault();
    API.getPerson()
    .then(res => {
      let abc = [];
      abc.push(res.data.results.name);
      console.log(abc);
      this.setState({users: abc});
    });
      
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Search by Name</label>
            <input type="text" value={this.state.search} onChange={this.handlesearchChange}></input>
          </div>
          <button type="submit">Submit</button>
        </form>
        <form onClick={this.handleSortAlphabet}>
          <div>
            <label>Sort Alphabetically</label>
          </div>
          <button type="click">Sort</button>
        </form>
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
          <tbody>
                {this.state.filtered.map(({ name, login, phone, email, dob }) => {
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

