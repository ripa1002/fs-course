import React from "react";

import { connect } from "react-redux";

import { addAnecdote, voteAnecdote } from "./reducer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anecdotes: [],
      title: ""
    };
  }

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    const anecdotes = this.props.anecdotes.sort((b, a) => a.votes - b.votes);
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.voteAnecdote(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        ))}
        <h2>create new anecdote</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.addAnecdote({
              content: this.state.title,
              votes: 0
            });
          }}
        >
          <div>
            <input onChange={this.handleChange} value={this.state.title} />
          </div>
          <button>create new</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addAnecdote,
  voteAnecdote
};

function mapStateToProps(state) {
  return {
    anecdotes: state
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);