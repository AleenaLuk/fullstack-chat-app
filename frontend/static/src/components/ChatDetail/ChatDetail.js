import {Component} from 'react';

class ChatDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      testing: '',
      isEditing: false,
      text: '',
    }

    this.saveMessage = this.saveMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
     event.preventDefault();
   }

   handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })

}
  saveMessage() {
console.log('hello')
    this.props.editMessage();
    this.setState({isEditing: false});

  }
  render() {
    return(
      <li>


        {
          this.state.isEditing
          ? <input type="text" name="text" value={this.state.text} onChange={this.handleChange}/>
          : <p>{this.props.message.text}</p>
        }

        <p>{this.props.message.user.username}</p>
        <button className="btn btn-danger"type="button" onClick={()=>this.props.removeMessage(this.props.message.id)}>delete</button>
        {
          this.state.isEditing
          ? <button className="btn btn-info"type="button" onClick={() => this.props.editMessage(this.props.message, this.state.text)}>Save</button>
          : <button className="btn btn-info"type="button" onClick={() => this.setState({isEditing: true})}>Edit</button>
        }

      </li>
    )
  }
}

export default ChatDetail;
