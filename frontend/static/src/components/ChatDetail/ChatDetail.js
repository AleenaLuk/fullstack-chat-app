import {Component} from 'react';

class ChatDetail extends Component {
  render() {
    return(
      <li>
        <p>{this.props.message.text}</p>
        <p>{this.props.message.user}</p>
        <button className="btn btn-danger"type="button" onClick={()=>this.props.removeMessage(this.props.message.id)}>delete</button>
        <button onClick={(e) => this.props.handleNewChat(this.state.specialinstructions, e)} className="btn btn-info"type="button">Edit</button>
      </li>
    )
  }
}

export default ChatDetail;
