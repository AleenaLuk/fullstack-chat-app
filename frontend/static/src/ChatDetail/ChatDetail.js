import {Component} from 'react';

class ChatDetail extends Component {
  render() {
    return(
      <li>
        <p>{this.props.message.text}</p>
        <p>{this.props.message.user}</p>
      </li>
    )
  }
}

export default ChatDetail;
