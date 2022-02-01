import React, { useState } from 'react'
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'

const LoginPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [apiError, setApiError] = useState(undefined)
    const [pendingApiCall, setPendingApiCall] = useState(false)


    const onChangeUserName = (event) => {
        const value = event.target.value
        setUsername(value)
        setApiError(undefined)
    }

    const onChangePassword = (event) => {
        const value = event.target.value
        setPassword(value)
        setApiError(undefined)
    }

    const onClickLogin = () => {
        setPendingApiCall(true)
        const body = {
            username, password
        }
        props.actions.postLogin(body)
            .then(response => {
                setPendingApiCall(false)
            })
            .catch(e => {
                if (e.response) {
                    setApiError(e.response.data.message)
                    setPendingApiCall(false)
                }
            })
    }


    let disableSubmit = username === '' || password === ''
    
    return (
        <div className='container'>

            <h1 className='text-center'>Login</h1>

            <div className='col-12 mb-3'>
                <Input
                    value={username}
                    onChange={onChangeUserName}
                    label='User Name'
                    placeholder='Your User Name'
                />
            </div>

            <div className='col-12 mb-3'>
                <Input
                    value={password}
                    onChange={onChangePassword}
                    label='Password'
                    placeholder='Your Password'
                    type='password'
                />
            </div>

            <div className='text-center'>
                {
                    apiError &&
                    (
                        <div className='col-12 mb-3'>
                            <div className='alert alert-danger'>
                                {apiError}
                            </div>
                        </div>
                    )
                }
                {/* <button
                        disabled={disableSubmit}
                        onClick={  .onClickLogin}
                        className='btn btn-primary'
                    >
                        Login
                    </button> */}
                <ButtonWithProgress
                    showProgress={pendingApiCall}
                    disabled={disableSubmit || pendingApiCall}
                    text="Login"
                    onClick={onClickLogin}
                />
            </div>
        </div>
    )
}


export default LoginPage