import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createUser, loginUser } from '../../store/actions/user';
import { useHistory, useLocation, Link } from 'react-router-dom';

const SignUp = ({
    createUser,
    loginUser,
    user
}) => {

    const history = useHistory()
    const location = useLocation()
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ error, setError ] = useState('')

    const route = location.pathname && location.pathname.includes('sign-in') ? 'sign-in' : 'sign-up'

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [])

    const onChangeName = e => {
        setName(e.target.value)
    }
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }
    const onChangePassword = e => {
        setPassword(e.target.value)
    }
    const onChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value)
    }

    const handleSignUp = async e => {
        e.preventDefault()
        setError('')
        if (password === confirmPassword) {
            const body = {
                name,
                email,
                password
            }
            try {
                await createUser(body)
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                history.push('/sign-in')
            } catch (error) {
                setError(error)
            }
        } else {
            setError('No ingresaste el mismo password')
        }
    }

    const handleSignIn = async e => {
        e.preventDefault()
        setError('')
        const body = {
            email,
            password
        }
        try {
            await loginUser(body)
            setEmail('')
            setPassword('')
            history.push('/')
        } catch (error) {
            setError(error)
        }
    }

    return (
        <form
            onSubmit={route === 'sign-in' ? handleSignIn : handleSignUp}
            className="input-group flex-nowrap container mt-4 mb-4 d-flex flex-column"
        >
            {error ?
                <div className="alert alert-danger" role="alert">
                    {error}
                </div> : null
            }

            <h1 className="text-success">
                {route === 'sign-up' ?
                    'Sign up here' : 'Sign in here'
                }
            </h1>
            {route === 'sign-up' ?
                <div className="mb-3">
                    <input
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        aria-label="name"
                        aria-describedby="addon-wrapping"
                        required
                    />
                </div> : null
            }
            <div className="mb-3">
                <input
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    aria-label="email"
                    aria-describedby="addon-wrapping"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="addon-wrapping"
                    required
                />
            </div>
            {route === 'sign-up' ?
                <div className="mb-3">
                    <input
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                        type="password"
                        className="form-control"
                        placeholder="Confirm your password"
                        aria-label="confirmPasword"
                        aria-describedby="addon-wrapping"
                        required
                    />
                </div> : null
            }
            
            <div className="alert alert-success mt-5" role="alert">
                {route === 'sign-up' ?
                    <Link to="/sign-in">
                        If you have an account, sign in!
                    </Link> :
                    <Link to="/sign-up">
                        If you don't have an account, sign up!
                    </Link>
                }
            </div>
        
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

const mapStateToProps = state => ({
    user: state.user && state.user.user ? state.user.user : null
})

const mapDispatchToProps = dispatch => ({
    createUser: body => dispatch(createUser(body)),
    loginUser: body => dispatch(loginUser(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
