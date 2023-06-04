import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import { useApiData } from './utilities/firebase';

// const utils = require('./utilities/firebase');
jest.mock('./utilities/firebase');

const mockProfiles = [
    {
        "fullName": "George",
        "department": "Marketing"
    },
    {
        "fullName": "Bian",
        "department": "Engineering"
    }
];

const mockValue = [mockProfiles, null];


test('department drop down renders', async () => {

    // utils.useApiData.mockResolvedValue(mockValue);
    useApiData.mockReturnValue(mockValue);

    render(<App />)
    expect(await screen.findByText(/department/)).toBeVisible()
})

test('department drop down renders', async () => {

    // utils.useApiData.mockResolvedValue(mockValue);
    useApiData.mockReturnValue(mockValue);

    render(<App />)
    expect(await screen.findByText(/Bian/)).toBeVisible()
})

// test('See if marketing department exists', async () => {
//     useApiData.mockReturnValue(mockValue);
//     render(<App />);
//
//     const dropdown = screen.getByText('Select department(s)');
//     fireEvent.click(dropdown);
//
//     expect(await dropdown.findByText(/Marketing/)).toBeVisible()
// });


test('select value from dropdown', async () => {
    useApiData.mockReturnValue(mockValue);
    render(<App />);

    // const dropdown = screen.queryByTestId("department-input");
    fireEvent.click(screen.getByText('Select department(s)'));
    fireEvent.click(screen.getByText('Engineering'));

    // expect(dropdown.value).toBe('Bian');
    expect(await screen.findByText(/Bian/)).toBeVisible()
});