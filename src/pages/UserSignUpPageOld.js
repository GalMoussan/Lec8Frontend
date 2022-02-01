import React from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";


class UserSignUpPageOld extends React.Component {
    state = {
        displayName: '',
        userName: '',
        password: '',
        pendingApiCalls: false,
        errors: {}
    }
    onChangeDisplayName = (e) => {
        const errors = {...this.state.errors}
        delete errors.displayName
        this.setState({ displayName: e.target.value , errors})
    }

    onChangeUserName = (e) => {
        const errors = {...this.state.errors}
        delete errors.userName
        this.setState({ userName: e.target.value , errors})
    }

    onChangePassword = (e) => {
        const errors = {...this.state.password}
        delete errors.password
        this.setState({ password: e.target.value , errors})
    }

    onClickSignUp = () => {
        this.setState({ pendingApiCalls: true })
        const user = {
            displayName: this.state.displayName,
            userName: this.state.userName,
            password: this.state.password
        }

        this.props.actions.postSignUp(user)
            .then((response) => {
                this.setState({ pendingApiCalls: false })
            })
            .catch(e => {

                // check that we have a response, response data and response data validationErrors
                let errors = { ...this.state.errors }
                if (e.response && e.response.data && e.response.data.validationErrors) {
                    // let errors = {...this.state.errors} // copy the state errors into a variable
                    errors = { ...e.response.data.validationErrors }
                }
                this.setState({ pendingApiCalls: false, errors: errors })
            })


    }


    render() {
        return (
            <div className='container'>

                <h1 className='text-center'>Sign up</h1>

                <div className='col-12 mb-3'>
                    <Input
                        label='Display Name'
                        onChange={this.onChangeDisplayName}
                        value={this.state.displayName}
                        placeholder='Your Display Name'
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        label='User Name'
                        value={this.state.userName}
                        onChange={this.onChangeUserName}
                        placeholder='Your username'
                        hasError={this.state.errors.userName && true}
                        error={this.state.errors.userName}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <Input
                        label='Password'
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        type='password'
                        placeholder='Your password'
                        hasError={this.state.errors.password && true}
                        error={this.state.errors.password}

                    />
                </div>

                <div className='col-12 mb-3 text-center'>
                    <ButtonWithProgress
                        disabled={this.state.pendingApiCalls}
                        text='Sign Up'
                        onClick={this.onClickSignUp}
                        showProgress={this.state.pendingApiCalls}
                    />
                </div>


            </div>


        )
    }
}

UserSignUpPageOld.defaultProps = {
    actions: {
        postSignUp: () => {
            return new Promise((resolve, reject) => {
                resolve({})
            })
        }
    }
}

export default UserSignUpPageOld;