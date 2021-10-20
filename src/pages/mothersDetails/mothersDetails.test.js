import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import MothersDetails from './MothersDetails';
import { getSubjectDetails, postSubjectDetails } from '../../service/subjectService';

jest.mock('../../service/subjectService');
jest.mock('axios');

const renderPage = async () => render(<MothersDetails />);

describe('MothersDetails', () => {
  it('should make an api request to the /mother endpoint', async () => {
    await act(async () => {
      await renderPage();
    });
    expect(getSubjectDetails.mockImplementation()).toHaveBeenCalled();
  });

  it('should render four empty input fields if no data added yet', async () => {
    await renderPage();

    const nameTitle = screen.getByText('First Name');
    const nameInput = screen.getByLabelText('First Name');
    const lastNameTitle = screen.getByText('Last Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const maidenNameTitle = screen.getByText('Maiden Name');
    const maidenNameInput = screen.getByLabelText('Maiden Name');
    const ageTitle = screen.getByText('Age');
    const ageInput = screen.getByLabelText('Age');

    expect(nameTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(lastNameTitle).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(maidenNameTitle).toBeInTheDocument();
    expect(maidenNameInput).toBeInTheDocument();
    expect(ageTitle).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
  });

  it('should be able to post and submit form details to the api', async () => {
    await act(async () => {
      await renderPage();
    });

    const nameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const maidenNameInput = screen.getByLabelText('Maiden Name');
    const ageInput = screen.getByLabelText('Age');
    const button = screen.getByTestId('submit-button');

    const firstName = 'Jane';
    const lastName = 'Doe';
    const maidenName = 'Smith';
    const age = '40';

    const detailsPayload = {
      firstName, lastName, maidenName, age,
    };

    await act(async () => {
      await userEvent.type(nameInput, firstName);
      await userEvent.type(lastNameInput, lastName);
      await userEvent.type(maidenNameInput, maidenName);
      await userEvent.type(ageInput, age);

      await userEvent.click(button);
    });

    expect(postSubjectDetails.mockImplementation()).toHaveBeenCalledWith('mother', detailsPayload);
  });

  it('renders the page with a get request and displays the data in the given input elements', async () => {
    const firstName = 'Jane';
    const lastName = 'Doe';
    const maidenName = 'Smith';
    const age = '40';

    const details = {
      data: {
        firstName, lastName, maidenName, age,
      },
    };

    getSubjectDetails.mockImplementation(() => details);

    await act(async () => {
      await renderPage();
    });

    const nameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const maidenNameInput = screen.getByLabelText('Maiden Name');
    const ageInput = screen.getByLabelText('Age');

    expect(nameInput.value).toBe(firstName);
    expect(lastNameInput.value).toBe(lastName);
    expect(maidenNameInput.value).toBe(maidenName);
    expect(ageInput.value).toBe(age);
  });
});
