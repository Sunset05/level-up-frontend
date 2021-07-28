import React, {useState, useEffect} from 'react'

export default function SignUpForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)

    useEffect(() => {
        localStorage.removeItem('token')
        props.removeUserFromState()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        let user = {
            username,
            password
        }

        login   
            ? props.loginUser(user)
                .then(() => props.history.push('/'))
            : props.signUp(user)
    }

    const handleChange = ({ target }) => {
        return target.name === "username"
        ? setUsername(target.value)
        : setPassword(target.value)
    }

    const handleLoginForm = (event) => {
        event.preventDefault()
        setLogin(!login)
    }

    const showAlerts = () => props.alerts.map((alert, index) => <p key={index}>{alert}</p>)
    
    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            { login ? <h1>Log In</h1> : <h1>Sign Up</h1>}
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange} />
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange} />
            <input  type="submit" />
            {login
                ? <p>Not a Member? <button onClick={handleLoginForm} >Sign Up</button></p>
                :<p>Already a member?<button onClick={handleLoginForm} >Log In</button></p>
            }
            { props.alerts ? showAlerts() : null }
        </form>
    )
}
