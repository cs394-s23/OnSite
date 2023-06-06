import { render, screen, fireEvent } from '@testing-library/react';
import { useApiData } from './utilities/firebase';
import App from './App';

jest.mock('./utilities/firebase');

const emptyMockProfile = [];

const mockProfile = [
    {
    "fullName": "Michael Smith",
    "department": "SW Development",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/687/850/non_2x/close-up-portrait-of-a-muslim-male-character-wearing-a-muslim-cap-kopiah-songkok-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-free-vector.jpg"
    },
];

const twoMockProfiles = [
    {
    "fullName": "Michael Smith",
    "department": "SW Development",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/687/850/non_2x/close-up-portrait-of-a-muslim-male-character-wearing-a-muslim-cap-kopiah-songkok-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-free-vector.jpg"
    },
    {
    "fullName": "Jennifer Johnson",
    "department": "Mobile Development",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/688/200/non_2x/close-up-portrait-of-a-female-character-with-an-islamic-veil-headscarf-hijab-chador-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-vector.jpg"
    },
];

const fiveMockProfiles = [
    {
    "fullName": "Michael Smith",
    "department": "SW Development",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/687/850/non_2x/close-up-portrait-of-a-muslim-male-character-wearing-a-muslim-cap-kopiah-songkok-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-free-vector.jpg"
    },
    {
    "fullName": "Jennifer Johnson",
    "department": "Mobile Development",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/688/200/non_2x/close-up-portrait-of-a-female-character-with-an-islamic-veil-headscarf-hijab-chador-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-vector.jpg"
    },
    {
    "fullName": "William Brown",
    "department": "Marketing",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/687/857/non_2x/close-up-portrait-of-muslim-male-character-wearing-muslim-cap-taqiyah-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-free-vector.jpg"
    },
    {
    "fullName": "Jessica Davis",
    "department": "Human Resources",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/688/189/non_2x/close-up-portrait-of-a-female-character-with-an-islamic-veil-headscarf-hijab-chador-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-vector.jpg"
    },
    {
    "fullName": "David Wilson",
    "department": "SW Development",
    "officeLocation": {
        "id": 1,
        "name": "Porto Alegre -BR"
    },
    "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/687/858/non_2x/close-up-portrait-of-a-muslim-male-character-wearing-a-muslim-cap-kopiah-songkok-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-free-vector.jpg"
    },
];

const emptyMockValue = [emptyMockProfile, null];
const oneMockValue = [mockProfile, null];
const twoMockValue = [twoMockProfiles, null];
const fiveMockValue = [fiveMockProfiles, null];

test('Correct number of employees displayed.', () => {
  
  // Zero employees
  useApiData.mockReturnValue(emptyMockValue);
  render(<App />);
  expect(screen.getByText(/0 people/)).toBeInTheDocument();

  // One employee
  useApiData.mockReturnValue(oneMockValue);
  render(<App />)
  expect(screen.getByText(/1 person/)).toBeInTheDocument();

  // Two employees
  useApiData.mockReturnValue(twoMockValue);
  render(<App />)
  expect(screen.getByText(/2 people/)).toBeInTheDocument();

  // Five employees
  useApiData.mockReturnValue(fiveMockValue);
  render(<App />)
  expect(screen.getByText(/5 people/)).toBeInTheDocument();

})

const poaMockProfile = [
    {
        "fullName": "Michael Smith",
        "department": "SW Development",
        "officeLocation": {
            "id": 1,
            "name": "Porto Alegre -BR"
        },
        "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/687/850/non_2x/close-up-portrait-of-a-muslim-male-character-wearing-a-muslim-cap-kopiah-songkok-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-free-vector.jpg"
    },
];

const spMockProfile = [
    {
        "fullName": "David Wilson",
        "department": "Support",
        "officeLocation": {
          "id": 2,
          "name": "São Paulo"
        },
        "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/688/192/non_2x/close-up-portrait-of-muslim-male-character-wearing-keffiyeh-kufiya-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-vector.jpg"
    },
];

const miaMockProfile = [
    {
        "fullName": "John Taylor",
        "department": "Mobile Development",
        "officeLocation": {
          "id": 3,
          "name": "Miami - US"
        },
        "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/687/857/non_2x/close-up-portrait-of-muslim-male-character-wearing-muslim-cap-taqiyah-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-free-vector.jpg"
    },
];

const lisMockProfile = [
    {
        "fullName": "Matthew Scott",
        "department": "SW Development",
        "officeLocation": {
          "id": 4,
          "name": "Lisboa – PT"
        },
        "userProfilePictureUrl": "https://static.vecteezy.com/system/resources/previews/021/688/195/non_2x/close-up-portrait-of-muslim-male-character-wearing-keffiyeh-kufiya-round-circle-avatar-icon-for-social-media-user-profile-website-app-line-cartoon-style-illustration-vector.jpg"
    },
];

const poaMockValue = [poaMockProfile, null];
const spMockValue = [spMockProfile, null];
const miaMockValue = [miaMockProfile, null];
const lisMockValue = [lisMockProfile, null];

test('Correct office name displayed when different office icon is clicked.', () => {

    // Initial screen displays Porto Alegre employee. 
    useApiData.mockReturnValueOnce(poaMockValue).mockReturnValueOnce(spMockValue).mockReturnValueOnce(miaMockValue).mockReturnValueOnce(lisMockValue);
    render(<App />);
    expect(screen.getByText(/Porto Alegre (BR) | 1 person/)).toBeInTheDocument();
    expect(screen.getByText(/Michael Smith/)).toBeInTheDocument();
    expect(screen.queryByText(/David Wilson/)).toBeNull();
    expect(screen.queryByText(/John Taylor/)).toBeNull();
    expect(screen.queryByText(/Matthew Scott/)).toBeNull();

    // Click on Sao Paulo office button. 
    const spButton = screen.getByText(/SP/);
    fireEvent.click(spButton);
    expect(screen.getByText(/Sao Paulo (BR) | 1 person/)).toBeInTheDocument();
    expect(screen.queryByText(/Michael Smith/)).toBeNull();
    expect(screen.getByText(/David Wilson/)).toBeInTheDocument();
    expect(screen.queryByText(/John Taylor/)).toBeNull();
    expect(screen.queryByText(/Matthew Scott/)).toBeNull();

    // Click on Miami office button. 
    const miaButton = screen.getByText(/MIA/);
    fireEvent.click(miaButton);
    expect(screen.getByText(/Miami (US) | 1 person/)).toBeInTheDocument();
    expect(screen.queryByText(/Michael Smith/)).toBeNull();
    expect(screen.queryByText(/David Wilson/)).toBeNull();
    expect(screen.getByText(/John Taylor/)).toBeInTheDocument();
    expect(screen.queryByText(/Matthew Scott/)).toBeNull();

    // Click on Lisboa office button. 
    const lisButton = screen.getByText(/LIS/);
    fireEvent.click(lisButton);
    expect(screen.getByText(/Lisboa (PT) | 1 person/)).toBeInTheDocument();
    expect(screen.queryByText(/Michael Smith/)).toBeNull();
    expect(screen.queryByText(/David Wilson/)).toBeNull();
    expect(screen.queryByText(/John Taylor/)).toBeNull();
    expect(screen.getByText(/Matthew Scott/)).toBeInTheDocument();
    
})