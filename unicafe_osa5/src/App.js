import React, { Component } from "react";
import { connect } from "react-redux";
import Buttons from "./components/Buttons";
import Statistics from "./components/Statistics";
import { addGood, addOk, addBad, setZero } from "./reducers/VoteRed";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      ok: 0,
      bad: 0
    };
  }

  getAverage = () => {
    return (
      (this.props.good + this.props.bad * -1) /
      (this.props.good + this.props.bad + this.props.ok)
    );
  };

  getPositive = () => {
    return this.props.good / (this.props.good + this.props.bad + this.props.ok);
  };

  hasData = () => {
    return !(
      this.props.good === 0 &&
      this.props.bad === 0 &&
      this.props.ok === 0
    );
  };

  render() {
    const stats = [
      {
        title: "Good",
        value: this.props.good
      },
      {
        title: "Neutral",
        value: this.props.ok
      },
      {
        title: "Bad",
        value: this.props.bad
      },
      {
        title: "Average",
        value: this.getAverage()
      },
      {
        title: "Positive",
        value: this.getPositive() * 100 + " %"
      }
    ];

    return (
      <div>
        <h1>Submit feedback</h1>
        <Buttons
          handleGood={this.props.addGood}
          handleNeutral={this.props.addOk}
          handleBad={this.props.addBad}
        />
        <h1>Statistics</h1>
        {this.hasData() ? (
          <Statistics data={stats} />
        ) : (
            "No data yet."
          )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addGood,
  addOk,
  addBad,
  setZero
};

function mapStateToProps(state) {
  return {
    good: state.vote.good,
    ok: state.vote.ok,
    bad: state.vote.bad
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);