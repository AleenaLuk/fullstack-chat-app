function Navbar(props) {
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">CHAT APP</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn" onClick={() => props.handleNavigation('chats')}>Home</button>
            </li>
            {props.isAuth
              ?
                <li className="nav-item">
                  <button className="btn" onClick={() => props.handleLogout()}>Logout</button>
                </li>
              :
                <>
                  <li className="nav-item">
                    <button className="btn" onClick={() => props.handleNavigation('login')}>Login</button>
                  </li>
                  <li className="nav-item">
                    <button className="btn" onClick={() => props.handleNavigation('register')}>Registration</button>
                  </li>
                </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
