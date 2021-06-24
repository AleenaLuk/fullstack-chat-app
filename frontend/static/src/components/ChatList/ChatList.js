import { Component } from 'react';
import Cookies from 'js-cookie';
import ChatDetail from './../ChatDetail/ChatDetail';
import ChatForm from './../ChatForm/ChatForm';

class ChatList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      edit: '',
      isediting: null,
    }

    this.fetchMessages = this.fetchMessages.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
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

  editMessage(id, message, user) {
  const currentMessage = {
    text: message,
    user: user,
  }
         const options = {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json',
             'X-CSRFToken': Cookies.get('csrftoken'),
           },
           body: JSON.stringify(currentMessage),
         }
         fetch(`/api/v1/chats/${id}/`, options)
           .then(response => response.json())
            // const messages = [...this.state.messages];
       }

saveMessage() {
  const newMessage = {
    text: '',
  }
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify(),
  }
  // fetch(`/api/v1/chats/${id}/`, options)
  //   .then(response => response.json())
}

 async removeMessage(id) {
    const options = {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
       },
     }

     fetch(`/api/v1/chats/${id}`, options)
    .then(response => {
      const messages = [...this.state.messages];
      const index = messages.findIndex(message => message.id === id);
      messages.splice(index, 1);
      this.setState({ messages });
    })

    .catch((error) => {
      console.error('Error:', error);
    });
  }




  render() {
    const messages = this.state.messages.map(message => (
      <ChatDetail key={message.id} message={message} removeMessage={this.removeMessage} updateMessage={this.updateMessage} editMessage={this.editMessage} saveMessage={this.saveMessage}/>
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
