import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    requestArray: [],
    pending: false
  }

  apiRequest = () => {
    if (this.state.pending === true) {
      return;
    }

    this.setState({
      pending: true
    },
      () => {
        axios.get('https://baconipsum.com/api/?type=meat-and-filter').then(res => {
          this.setState({
            requestArray: [...this.state.requestArray, ...res.data],
            pending: false
          });
          console.log(res.data);
        }).catch(err => {
          this.setState({
            pending: false
          });
          console.log(err);
        })
      }
    )
  }

  componentDidMount() {
    this.apiRequest();
  }

  render() {
    const renderArray = (arr) => {
      return arr.map((data, idx) => {
        return <div key={idx}>{data}</div>
      });
    }

    return (
      <div className="App">
        {renderArray(this.state.requestArray)}
        <button onClick={this.apiRequest}>Click me</button>
      </div>
    );
  }
}

export default App;
