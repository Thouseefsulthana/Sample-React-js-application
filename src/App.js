import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.svg';
import Quiz from './components/Quiz';
import { connect } from 'react-redux';
import { ActionTypes } from './constants/actionTypes';

const mapStateToProps = state => { return { ...state.quiz } };

const mapDispatchToProps = dispatch => ({
  onQuizLoad: payload => dispatch({ type: ActionTypes.QuizLoad, payload }),
  onPagerUpdate: payload => dispatch({ type: ActionTypes.PagerUpdate, payload })
});

class App extends Component {
  state = {
    
    data: 'api/data.json'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  }

  componentDidMount() {
    this.load(this.state.data);
  }

  load(data) {
    let url = data || this.props.data;
    fetch(`../${url}`).then(res => res.json()).then(res => {
      let quiz = res;
      quiz.questions.forEach(q => {
        q.options.forEach(o => o.selected = false);
      });
      quiz.config = Object.assign(this.props.quiz.config || {}, quiz.config);
      this.pager.count = quiz.questions.length / this.pager.size;
      this.props.onQuizLoad(quiz);
      this.props.onPagerUpdate(this.pager);
    });
  }

  

  render() {
    return (
      <div className="container">
       <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         
        </header>
        <Quiz quiz={this.state.quiz} data={this.state.data} mode={this.state.mode} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
