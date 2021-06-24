import {Component} from 'react';

class ChatDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      testing: '',
      isEditing: false,
    }
  }
  render() {
    return(
      <li>


        {
          this.state.isEditing
          ? <input type="text"/>
          : <p>{this.props.message.text}</p>
        }

        <p>{this.props.message.user}</p>
        <button className="btn btn-danger"type="button" onClick={()=>this.props.removeMessage(this.props.message.id)}>delete</button>
        {
          this.state.isEditing
          ? <button className="btn btn-info"type="button" onClick={()=>this.setState({})}>Save</button>
          : <button className="btn btn-info"type="button" onClick={()=>this.setState({ isEditing: true })}>Edit</button>
        }

      </li>
    )
  }
}

export default ChatDetail;
