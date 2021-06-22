import { Component } from 'react';

import ChatDetail from './../ChatDetail/ChatDetail';
import ChatForm from './../ChatForm/ChatForm';

class ChatList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }

    this.fetchMessages = this.fetchMessages.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
    const messageInterval = setInterval(this.fetchMessages, 1000);
    this.setState({ messageInterval });
  }

  componentWillUnmount() {
    // https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class
    clearInterval(this.state.messageInterval);
  }

  async fetchMessages() {
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/chats/').catch(handleError);
    if(response.ok) {
      const data = await response.json().catch(handleError);
      this.setState({messages: data});
    }
  }


  async addMessage(chat) {
    this.props.handleNewChat(chat);
  }

  async removeMessage(event) {
      event.preventDefault();
      this.props.removeMessage(this.state);
    }


  async updateMessage() {

  }

  render() {
    const messages = this.state.messages.map(message => (
      <ChatDetail key={message.id} message={message} removeMessage={this.removeMessage} updateMessage={this.updateMessage}/>
    ))
    return(

      <>
        <ChatForm handleNewChat={this.addMessage}/>
        <ul>{messages}</ul>
      </>
    )
  }
}

export default ChatList;
