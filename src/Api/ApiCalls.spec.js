import axios from 'axios';
import * as apiCalls from './ApiCalls';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

describe('apiCalls', ()=>{
    describe('signup', ()=>{
        // test:
        it('calls /api/1/users', ()=>{
            // we dont send real requests from the test code
            // we do a mock call
            const mockPost = jest.fn()

            // replace the real post method from axios with an empty mock function:
            axios.post = mockPost

            apiCalls.signUp()

            const param0 = mockPost.mock.calls[0][0]
            expect(param0).toBe('/api/1/users')

        })
    })
})