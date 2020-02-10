import React, { Component } from 'react'
import axios from 'axios';

export class Countries extends Component {

    state = {
        abc: []
    }

    componentDidMount() {
        axios.get('http://localhost:3009/api/v1/countries.json')
            .then(res => {
                this.setState({abc: res.data})
                debugger;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <b>Flag</b>
                    </div>
                    <div className="col-md-2">
                        <b>Name</b>
                    </div>
                    <div className="col-md-2">
                        <b>Capital</b>
                    </div>
                    <div className="col-md-1">
                        <b>Country Code</b>
                    </div>
                    <div className="col-md-1">
                        <b>Region</b>
                    </div>
                    <div className="col-md-2">
                        <b>Population</b>
                    </div>
                </div>
                {this.state.abc.map((anObjectMapped, index) => {
                    return (
                        <div className="row" >
                            <div className="col-md-2">
                                <img src={anObjectMapped.flag} width="25px"></img>
                            </div>
                            <div className="col-md-2">
                                {anObjectMapped.name}
                            </div>
                            <div className="col-md-2" >
                                {anObjectMapped.capital}
                            </div>
                            <div className="col-md-1" >
                                {anObjectMapped.callingCodes}
                            </div>
                            <div className="col-md-1" >
                                {anObjectMapped.region}
                            </div>
                            <div className="col-md-2" >
                                {anObjectMapped.population}
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default Countries
