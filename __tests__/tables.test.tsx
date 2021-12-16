import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Tables } from '../components/tables';
import axios from 'axios'


test('renders authors table', () => {

    const { getByTestId } = render(<Tables />)
    screen.debug()
    
})

test('renders books table', () => {

})

test('renders nationality picker', () => {

})