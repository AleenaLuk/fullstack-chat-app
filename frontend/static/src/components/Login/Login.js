import { Component } from 'react';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleLogin(this.state);
  }

  render() {
    return (
      <form className="col-8" onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" onChange={this.handleInput} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={this.handleInput} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={this.handleInput} />
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-link ms-auto" onClick={() => this.props.handleNavigation('register')}>Need an account? Register</button>
        </div>
      </form>
    )
  }
}

export default Login;
