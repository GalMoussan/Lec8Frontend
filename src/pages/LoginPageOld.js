import { Component } from 'react'
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'

export class LoginPageOld extends Component {

    state = {
        username: '',
        password: '',
        apiError: undefined,
        pendingApiCall: false
    }

    onChangeUserName = (event) => {
        const value = event.target.value
        this.setState({
            username: value,
            apiError: undefined
        })
    }

    onChangePassword = (event) => {
        const value = event.target.value
        this.setState({
            password: value,
            apiError: undefined
        })
    }

    onClickLogin = () => {
        this.setState({ pendingApiCall: true })
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.actions.postLogin(body)
            .then(response => {
                this.setState({ pendingApiCall: false })
            })
            .catch(e => {
                if (e.response) {
                    this.setState({
                        apiError: e.response.data.message,
                        pendingApiCall: false
                    })
                }
            })
    }

    render() {
        let disableSubmit = false
        if (this.state.username === '') {
            disableSubmit = true
        }
        else if (this.state.password === '') {
            disableSubmit = true

        }
        return (
            <div className='container'>

                <h1 className='text-center'>Login</h1>

                <div className='col-12 mb-3'>
                    <Input
                        value={this.state.username}
                        onChange={this.onChangeUserName}
                        label='User Name'
                        placeholder='Your User Name'
                    />
                </div>

                <div className='col-12 mb-3'>
                    <Input
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        label='Password'
                        placeholder='Your Password'
                        type='password'
                    />
                </div>

                <div className='text-center'>
                    {
                        this.state.apiError &&
                        (
                            <div className='col-12 mb-3'>
                                <div className='alert alert-danger'>
                                    {this.state.apiError}
                                </div>
                            </div>
                        )
                    }
                    {/* <button
                        disabled={disableSubmit}
                        onClick={this.onClickLogin}
                        className='btn btn-primary'
                    >
                        Login
                    </button> */}
                    <ButtonWithProgress
                        showProgress={this.state.pendingApiCall}
                        disabled={disableSubmit || this.state.pendingApiCall}
                        text="Login"
                        onClick={this.onClickLogin}
                    />
                </div>
            </div>
        )
    }
}

LoginPageOld.defaultProps = {
    actions: {
        postLogin: () => new Promise((resolve, reject) => resolve({}))
    }
}