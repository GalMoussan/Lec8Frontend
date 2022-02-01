import React, { Component } from 'react'

export default class Hello extends Component {
    render() {
        return (
            <div>
                <h1>Hello, {this.props.name}</h1>
                <p>Your last Name is: {this.props.lastName}</p>
            </div>
        )
    }
}


