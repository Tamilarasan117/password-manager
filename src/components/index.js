import './index.css'
import {Component} from 'react'
import {v4 as uuid} from 'uuid'

const initialBackgroundColor = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
]

const PassWordList = props => {
  const {
    passwordListDetails,
    isPasswordToggle,
    onDeletePassword
  } = props

  const {
    id,
    newWebsite,
    newUsername,
    newPassword,
    backgroundClassName,
  } = passwordListDetails

  const isToggle = isPasswordToggle

  const deletePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-list">
      <div className="user-detail-card">
        <div
          className={`user-logo-card ${initialBackgroundColor[backgroundClassName]}`}
        >
          <p className="user-logo">{newWebsite[0].toUpperCase()}</p>
        </div>
        <div className="user-name-password-card">
          <p className="user-password-details">{newWebsite}</p>
          <p className="user-password-details">{newUsername}</p>
          {
            isToggle
              ?
                <p className="user-password-details">{newPassword}</p>
              :
                <p className="star-password-details">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                  alt="stars"
                  className="star-icon"
                />
              </p>
          }
        </div>
      </div>
      <div className="delete-button-card">
        <button
          type="button"
          className="delete-button"
          onClick={deletePassword}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

class PasswordManager extends Component {
  state = {
    passwordLists: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isPasswordToggle: false,
  }

  onWebsite = event => {
    this.setState({website: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {
      website,
      username,
      password,
    } = this.state
    
    const randomNumber = Math.floor(
      Math.random() * initialBackgroundColor.length,
    )
    
    const newPasswordDetails = {
      id: uuid(),
      newWebsite: website,
      newUsername: username,
      newPassword: password,
      backgroundClassName: randomNumber,
      isToggle: false,
    }

    this.setState(eachPassword => ({
      passwordLists: [...eachPassword.passwordLists, newPasswordDetails],
      website: '',
      username: '',
      password: '',
    }))
  }

  onSearchWebsite = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeToggle = () => {
    this.setState(beforeState => ({
      isPasswordToggle: !beforeState.isPasswordToggle,
    }))
  }

  onDeletePassword = id => {
    const {passwordLists} = this.state
    const filtredPasswordLists = passwordLists.filter(
      eachPassword => id !== eachPassword.id,
    )
    this.setState({passwordLists: filtredPasswordLists})
  }

  render() {
    const {
      passwordLists,
      isPasswordToggle,
      website,
      username,
      password,
      searchInput
    } = this.state

    const searchResult = passwordLists.filter(eachItem => (
      eachItem.newWebsite.toLowerCase().includes(searchInput.toLowerCase())
    ))

    const check = searchResult.length > 0

    return (
      <>
        <div className="app-container">
          <div className="container">
            <div className="app-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
                alt="app logo"
                className="app-logo"
              />
            </div>
            <div className="manager-container">
              <form className="form-container" onSubmit={this.onAddNewPassword}>
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-img"
                  />
                  <hr className="line" />
                  <input
                    type="text"
                    name="website"
                    id="website"
                    className="input-field"
                    placeholder="Enter Website"
                    onChange={this.onWebsite}
                    value={website}
                  />
                </div>
                <div className="input-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-img"
                  />
                  <hr className="line" />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="input-field"
                    placeholder="Enter Username"
                    onChange={this.onUsername}
                    value={username}
                  />
                </div>
                <div className="input-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-img"
                  />
                  <hr className="line" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input-field"
                    placeholder="Enter Password"
                    onChange={this.onPassword}
                    value={password}
                  />
                </div>
                <div className="button-card">
                  <button type="submit" className="form-button">
                    Add
                  </button>
                </div>
              </form>
              <div className="manager-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                  alt="password manager"
                  className="manager-img"
                />
              </div>
            </div>
            <div className="password-container">
              <div className="search-count-container">
                <div className="count-card">
                  <h1 className="password-counter">Your Passwords</h1>
                  <p className="count">{searchResult.length}</p>
                </div>
                <div className="password-search-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="input-img"
                  />
                  <hr className="password-line" />
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="input-field"
                    placeholder="Search"
                    onChange={this.onSearchWebsite}
                    value={searchInput}
                  />
                </div>
              </div>
              <hr className="password-split-line" />
              <div className="show-password-card">
                <input
                  type="checkbox"
                  id="Show Passwords"
                  onClick={this.onChangeToggle}
                />
                <label className="password-label" htmlFor="Show Passwprds">
                  Show passwords
                </label>
              </div>
              <ul className="password-list-container">
                {
                  check
                    ?
                      searchResult.map(eachPassword => (
                        <PassWordList
                          passwordListDetails={eachPassword}
                          key={eachPassword.id}
                          isPasswordToggle={isPasswordToggle}
                          onDeletePassword={this.onDeletePassword}
                        />
                      ))
                    :
                    <li className="no-password-list">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                        alt="no passwords"
                        className="no-password-img"
                      />
                      <p className="no-password">No Passwords</p>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PasswordManager
