import React, { Component } from 'react';

class Success extends Component {
    render() {
        return (
            <div className="alert alert-success">
                {this.props.message}
            </div>
        );
    }
}

export default Success;