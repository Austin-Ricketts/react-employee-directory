import React, { Component } from "react";
import API from "../utils/API";

export default class Persons extends Component {
  state = {
    search: "",
    users: [],
    filtered: [],
    alphasort: ''
  };

  componentDidMount() {
    API.getPerson()
      .then(res => 
        {
          this.setState({ users: res.data.results })
          this.setState({ filtered: res.data.results })
          console.log(this.state.filtered);
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
      let name = user.name.first.toLowerCase()
      let search_value = this.state.search.toLowerCase()
      console.log("Does the name: " + user.name.first + `include a ` + search_value + " : " + name.includes(search_value));
      return name.includes(this.state.search.toLowerCase())
  })
  console.log(result)
  this.setState({filtered: result}); 
}

  handleSortAlphabet = event => {
    event.preventDefault();
    if (this.state.alphasort == '' || this.state.alphasort == 'descending') 
    { 
      this.setState({ alphasort: 'ascending' });
      let sortArray = this.state.filtered.sort(function(a, b){
      var x = a.name.last.toLowerCase();
      var y = b.name.last.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
      this.setState({filtered: sortArray});
    } else if (this.state.alphasort == 'ascending') 
      {
        this.setState({ alphasort: 'descending' });
      let sortArray = this.state.filtered.sort(function(a, b){
      var x = a.name.last.toLowerCase();
      var y = b.name.last.toLowerCase();
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
      })
      this.setState({filtered: sortArray});
  }
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

