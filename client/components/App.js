import React from 'react';
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
      <div className='container'>

        <div className='row add-duck-feeding-row'>
          <div className='col text-center'>
            <Add />
          </div>
        </div>

        <div className='row all-duck-feedings-row'>
          <div className='col'>
            {/* <table>
              <thead>
                <tr><th></th><th className='desc-col'>Date</th><th className='button-col'>Food Type</th><th className='button-col'>Amount in Grams</th><th className='button-col'>Location</th><th className='button-col'>Number of Ducks Fed</th></tr>
              </thead>
              <tbody>
                {
                  this.state.data.map(function (feeding, index) {
                    return <tr key={index}><td className='counterCell'></td><td className='desc-col'>{feeding.date}</td><td className='button-col'>{feeding.foodType}</td><td className='button-col'>{feeding.foodAmountInGrams}</td><td className='button-col'>{feeding.location}</td><td className='button-col'>{feeding.numberOfDucks}</td></tr>
                  })
                }
              </tbody>
            </table> */}
            <div className='row'>
              <div className='col'><h5>Date</h5></div>
              <div className='col'><h5>Food Type</h5></div>
              <div className='col'><h5>Amount in Grams</h5></div>
              <div className='col'><h5>Location</h5></div>
              <div className='col'><h5>Ducks Fed</h5></div>
            </div>
            {
              this.state.data.map(function (feeding, index) {
                return (
                  <div className='row duck-feeding-entry' key={index}>
                    <div className='col'>{feeding.date}</div>
                    <div className='col'>{feeding.foodType}</div>
                    <div className='col'>{feeding.foodAmountInGrams}</div>
                    <div className='col'>{feeding.location}</div>
                    <div className='col'>{feeding.numberOfDucks}</div>
                  </div>

                )
              
              })
            }
          </div>
        </div>

      </div>
    );
  }
}