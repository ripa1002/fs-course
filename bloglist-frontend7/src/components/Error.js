import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div className="alert alert-danger">
                {this.props.message}
            </div>
        );
    }
}

export default Error;