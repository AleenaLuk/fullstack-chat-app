import { Component } from 'react';

import Cookies from 'js-cookie';

import Navbar from './../Navbar/Navbar';

import Registration from './../Registration/Registration';
import Login from './../Login/Login';

import ChatList from './../ChatList/ChatList';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selection: !!Cookies.get('Authorization') ? 'chats' : 'login'
    }

    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewChat = this.handleNewChat.bind(this);
  }


  handleNavigation(selection) {
    this.setState({ selection });
  }

  async handleRegistration(user) {
    const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
     },
     body: JSON.stringify(user),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/registration/', options).catch(handleError);

    if(response.ok) {
      const data = await response.json().catch(handleError);
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({ selection: 'chats' });
    }
  }

  async handleLogin(user) {
    const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
     },
     body: JSON.stringify(user),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/login/', options).catch(handleError);

    if(response.ok) {
      console.log('response', response)
      const data = await response.json().catch(handleError);
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({ selection: 'chats' });
    }
  }

  async handleLogout() {
    const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'X-CSRFToken': Cookies.get('csrftoken'),
     },
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/logout/', options).catch(handleError);

    if(response.ok) {
      Cookies.remove('Authorization');
      this.setState({ selection: 'login' });
    }
  }

  async handleNewChat(chat) {
    console.log('text', chat)
    const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
     },
     body: JSON.stringify(chat),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/chats/', options).catch(handleError);

    if(response.ok) {
      const data = await response.json().catch(handleError);
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({ selection: 'chats' });
    }
  }

  render() {

    return (
      <div className="justify-content-center row">
        <Navbar handleNavigation={this.handleNavigation} isAuth={this.state.selection === 'chats'} handleLogout={this.handleLogout}/>
        {this.state.selection === 'login' && <Login handleNavigation={this.handleNavigation} handleLogin={this.handleLogin}/>}
        {this.state.selection === 'register' && <Registration handleNavigation={this.handleNavigation} handleRegistration={this.handleRegistration}/>}
        {this.state.selection === 'chats' && <ChatList handleNewChat={this.handleNewChat} />}
      </div>
    );
  }
}

export default App;
