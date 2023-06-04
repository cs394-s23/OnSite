import { render, screen, fireEvent } from '@testing-library/react';
import App from './../App';
import { useApiData } from './../utilities/firebase';

jest.mock('./../utilities/firebase');

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