import React from "react";
// the spec file must contain at least 1 test.
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import UserSignUpPage from "./UserSignUpPage";
import { waitForElementToBeRemoved } from "@testing-library/dom";

describe('UserSignUpPage', () => {
    //group of tests
    describe('Layout', () => {
        // single test:
        it('has header h1 with sign up', () => {
            //render
            const { container } = render(<UserSignUpPage />)

            //normal way - const heading = result.container.querySelector('h1')
            const heading = container.querySelector('h1')
            //find
            expect(heading).toHaveTextContent(/sign up/i)
            //expect

        });

        it('has only 1 h1', () => {
            //render
            const { container } = render(<UserSignUpPage />)

            //normal way - const heading = result.container.querySelector('h1')
            const allH1s = container.querySelectorAll('h1')
            //find
            expect(allH1s.length).toBe(1)
            //expect
        });

        it('has input for display name', () => {
            // object de-structuring
            const obj = render(<UserSignUpPage />)
            const input = obj.queryByPlaceholderText(/display name/i)
            expect(input).toBeInTheDocument()
        });


        it('has input for username', () => {
            // object de-structuring
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/username/i)
            expect(input).toBeInTheDocument();
        });

        it('has input for password', () => {
            // object de-structuring
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Your password/i)
            expect(input).toBeInTheDocument();
        });

        it('has password type for input password', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/your password/i)
            expect(input.type).toBe('password')
        })

        it('has submit button', () => {
            const { container } = render(<UserSignUpPage />)
            const btn = container.querySelector('button')
            expect(btn).toBeInTheDocument()
            expect(btn.textContent).toMatch(/Sign Up/i)
        })

    })

    describe('Interactions', () => {

        const changeEvent = (text) => {
            return {
                target: {
                    value: text
                }
            }
        }

        // mock an async function that returns a resolved promise after 300ms
        const mockAsyncDelayed = (success = true)=>{
            return jest.fn().mockImplementation(()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        success ? resolve({}) : reject('error')
                    }, 300)
                })
            })
        }

        let button, displayNameInput, userNameInput, passwordInput
        const setUpForSubmit = (props) => {

            // render the component with all the props:
            const rendered = render(<UserSignUpPage {...props} />)

            // spread the rendered object:
            const { container, queryByPlaceholderText } = rendered

            //find the inputs by placeHolder:
            const userNameInput = queryByPlaceholderText(/Your username/i)
            const displayNameInput = queryByPlaceholderText(/display name/i)
            const passwordInput = queryByPlaceholderText(/Your password/i)

            // find the button by tag name:
            button = container.querySelector('button')

            // simulate user typing data into the inputs:
            fireEvent.change(userNameInput, changeEvent('my-user-name'))
            fireEvent.change(displayNameInput, changeEvent('my-display-name'))
            fireEvent.change(passwordInput, changeEvent('P4ssword!'))

            // return the rendered object:
            return rendered
        }

        it('sets the display name value into state', () => {
            // fireEvent = mock a click/input change
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/display name/i)

            fireEvent.change(input, changeEvent('my-display-name'))

            expect(input).toHaveValue('my-display-name')
        })

        it('sets the user name value into state', () => {
            // fireEvent = mock a click/input change
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Your username/i)

            fireEvent.change(input, changeEvent('my-username'))

            expect(input).toHaveValue('my-username')
        })

        it('sets the password value into state', () => {
            // fireEvent = mock a click/input change
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/password/i)

            fireEvent.change(input, changeEvent('P4ssword!'))

            expect(input).toHaveValue('P4ssword!')
        })

        it('calls postSignUp when the fields are valid and the actions are provided in props', () => {
            // check that inputs are valid
            // the btn calls the postSignUp method => a method returns a promise

            const actions = {
                // a function that returns a resolved promise;
                postSignUp: jest.fn().mockResolvedValueOnce({})
            }
            setUpForSubmit({ actions })


            fireEvent.click(button)
            expect(actions.postSignUp).toBeCalledTimes(1)
        })

        it('calls postSignUp with user body when the fields are valid', () => {
            // check that inputs are valid
            // the btn calls the postSignUp method => a method returns a promise

            const actions = {
                // a function that returns a resolved promise;
                postSignUp: jest.fn().mockResolvedValueOnce({})
            }

            setUpForSubmit({ actions })
            fireEvent.click(button)

            const expectedUser = {
                userName: 'my-user-name',
                displayName: 'my-display-name',
                password: 'P4ssword!'
            }

            expect(actions.postSignUp).toHaveBeenCalledWith(expectedUser)
        })

        it('does not throw an exception when clicking the button and we have no action in props', () => {


            setUpForSubmit()
            expect(() => {
                fireEvent.click(button)
            }).not.toThrow()

        })

        it('disables signUp button when there is an on-going api call', () => {
            const actions ={
                postSignUp:mockAsyncDelayed()
            }

            setUpForSubmit({actions})

            fireEvent.click(button)
            fireEvent.click(button)

            expect(actions.postSignUp).toHaveBeenCalledTimes(1)
        })

        it('shows spinner when there is an on-going api call', () => {
            const actions ={
                postSignUp:mockAsyncDelayed()
            }

            const {queryByText} = setUpForSubmit({actions})

            fireEvent.click(button)

            const spinner = queryByText(/Loading/i)
            expect(spinner).toBeInTheDocument()
        })


        it('hides spinner when api call is finished successfully', async() => {
            const actions ={
                postSignUp:mockAsyncDelayed()
            }

            const {queryByText} = setUpForSubmit({actions})

            fireEvent.click(button)

            await waitForElementToBeRemoved(()=>queryByText(/Loading/i))
        })



    })
})




