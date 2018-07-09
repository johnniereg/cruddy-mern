import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add'
export default class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getData(this);
  }

  getData(ev) {
    axios.get('/getAll')
      .then(function (response) {
        ev.setState({ data: response.data });
      });
  }

  render() {
    return (
      <div>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        <table>
          <thead>
            <tr><th></th><th className='desc-col'>Date</th><th className='button-col'>Food Type</th><th className='button-col'>Amount in Grams</th><th className='button-col'>Location</th><th className='button-col'>Number of Ducks Fed</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function (exp) {
                return <tr><td className='counterCell'></td><td className='desc-col'>{exp.date}</td><td className='button-col'>{exp.foodType}</td><td className='button-col'>{exp.foodAmountInGrams}</td><td className='button-col'>{exp.location}</td><td className='button-col'>{exp.numberOfDucks}</td></tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}