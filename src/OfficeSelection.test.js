import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { useApiData } from './utilities/firebase';

jest.mock('./utilities/firebase');

const mockProfiles = [
    {
        "fullName": "Abby",
        "department": "Manager"
    }
];
const mockProfiles2 = [
    {
        "fullName": "Ben",
        "department": "Support"
    }
];

// Julian Baldwin; simple unit test
test('changing office location changes displayed profiles', async () => {
    useApiData.mockReturnValueOnce([mockProfiles, null]).mockReturnValue([mockProfiles2, null]);
    render(<App/>);

    // check that Abby profile is displayed but Ben is not
    expect(screen.queryByText('Abby')).toBeVisible();
    expect(screen.queryByText('Ben')).toBeNull();
    // select second office location
    fireEvent.click(screen.getByText("SP"));
    // check that Abby profile is no longer display, but Ben is
    expect(screen.queryByText('Abby')).toBeNull();
    expect(screen.queryByText('Ben')).toBeVisible();
})

// Julian Baldwin; harder unit test
test('changing office resets filters', async () => {
    useApiData.mockReturnValueOnce([mockProfiles, null]).mockReturnValue([mockProfiles2, null]);
    render(<App/>);

    fireEvent.click(screen.getByText('Select department(s)'));
    fireEvent.click(screen.getByText('Human Resources'));
    // check that filter is active (no HR profiles in mock data)
    expect(screen.queryByText('No employees found')).toBeVisible();

    fireEvent.click(screen.getByText("SP"));
    // Ben profile should be visible because filter has been removed
    expect(screen.queryByText('Ben')).toBeVisible();

    fireEvent.click(screen.getByText('Select department(s)'));
    fireEvent.click(screen.getByText('Human Resources'));
    // after we reactivate filter, there are no employees found
    expect(screen.queryByText('No employees found')).toBeVisible();
})