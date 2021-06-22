import React, { Component } from 'react';

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
        <label for="w3review">Chat</label>
         <textarea id="w3review" rows="4" cols="20" name="text" onChange={this.handleInput}>
          </textarea>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
     </React.Fragment>
    )
  }
}
export default ChatForm;