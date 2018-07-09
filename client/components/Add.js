//client/components/Add.js
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
var querystring = require('querystring');


class Add extends React.Component {
    constructor() {
        super();

        this.state = {
            date: '',
            foodType: '',
            foodAmountInGrams: '',
            location: '',
            numberOfDucks: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewFeeding = this.insertNewFeeding.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            description: '',
            amount: '',
            month: 'Jan',
            year: 2016,
            messageFromServer: ''
        });
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    componentDidMount() {
        this.setState({
            month: this.props.selectedMonth
        });
        this.setState({
            year: this.props.selectedYear
        });
    }

    handleSelectChange(e) {
        if (e.target.name == 'month') {
            this.setState({
                month: e.target.value
            });
        }
        if (e.target.name == 'year') {
            this.setState({
                year: e.target.value
            });
        }
    }

    onClick(e) {
        this.insertNewFeeding(this);
    }

    insertNewFeeding(e) {
        axios.post('/feeding',
            querystring.stringify({
                date: e.state.date,
                foodType: e.state.foodType,
                foodAmountInGrams: e.state.foodAmountInGrams,
                location: e.state.location,
                numberOfDucks: e.state.numberOfDucks
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                e.setState({
                    messageFromServer: response.data
                });
            });
    }

    handleTextChange(e) {
        if (e.target.name == "date") {
            this.setState({
                date: e.target.value
            });
        }
        if (e.target.name == "foodType") {
            this.setState({
                foodType: e.target.value
            });
        }
        if (e.target.name == "foodAmountInGrams") {
            this.setState({
                foodAmountInGrams: e.target.value
            });
        }
        if (e.target.name == "location") {
            this.setState({
                location: e.target.value
            });
        }
        if (e.target.name == "numberOfDucks") {
            this.setState({
                numberOfDucks: e.target.value
            });
        }
    }

    render() {
        if (this.state.messageFromServer == '') {
            return (
                <div>
                    <Button bsStyle="success" bsSize="large" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span>Add New Feeding</Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Feeding"
                        className="Modal">

                        {/* Close Modal Button */}
                        <Link to={{ pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                            <Button bsStyle="danger" bsSize="xsmall" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove">x</span></Button>
                        </Link><br />

                        {/* Form Inputs for Feeding Entries */}
                        <fieldset>
                            
                            <label htmlFor="date">Date:</label><input type="date" id="date" name="date" value={this.state.date} onChange={this.handleTextChange}></input>

                            <label htmlFor="foodType">Food Type:</label><input type="text" id="foodType" name="foodType" value={this.state.foodType} onChange={this.handleTextChange}></input>

                            <label htmlFor="foodAmountInGrams">Food Amount In Grams:</label><input type="number" id="foodAmountInGrams" name="foodAmountInGrams" value={this.state.foodAmountInGrams} onChange={this.handleTextChange}></input>

                            <label htmlFor="location">Feeding Location:</label><input type="text" id="location" name="location" value={this.state.location} onChange={this.handleTextChange}></input>

                            <label htmlFor="numberOfDucks">Number of Ducks Fed:</label><input type="number" id="numberOfDucks" name="numberOfDucks" value={this.state.numberOfDucks} onChange={this.handleTextChange}></input>

                        </fieldset>

                        {/* Submit */}
                        <div className='button-center'>
                            <br />
                            <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Feeding</Button>
                        </div>

                    </Modal>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Feeding"
                        className="Modal">
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link to={{ pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                                <Button bsStyle="success" bsSize="xsmall" onClick={this.closeModal}>Back to Feedings</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}
export default Add;