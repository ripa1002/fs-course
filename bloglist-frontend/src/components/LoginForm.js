import * as React from 'react'

const LoginForm = ({ username, password, handleFieldChange, login }) => (
    <div>
        <h2>Kirjaudu</h2>

        <form className="form" onSubmit={login}>
            <div className="form-group">
                Username
          <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleFieldChange}
                />
            </div>
            <div className="form-group">
                Password
          <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleFieldChange}
                />
            </div>
            <button className="btn btn-success">Log in</button>
        </form>
    </div>
)

export default LoginForm;