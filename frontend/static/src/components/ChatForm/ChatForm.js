import React, { Component } from 'react';

import './ChatForm.css';

class ChatForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      user: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleNewChat(this.state);
    this.fetchUser();
  }

  async fetchUser() {
    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/user/').catch(handleError);
    if(response.ok) {
      const data = await response.json().catch(handleError);
      this.setState({
        test: data,
        user: data.pk
      });
    }
  }


  render() {
    return(
      <React.Fragment>
        <form className="col-8" onSubmit={this.handleSubmit}>
        <h2>Chat</h2>
        <div class="md-form amber-textarea active-amber-textarea-2">
          <i class="fas fa-pencil-alt prefix"></i>
          <textarea id="form24" class="md-textarea form-control" rows="3"></textarea>
           </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-info">Submit</button>
          </div>
        </form>
     </React.Fragment>
    )
  }
}
export default ChatForm;
