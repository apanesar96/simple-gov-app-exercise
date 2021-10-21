import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import SubjectDetails from './SubjectDetails';
import { getSubjectDetails, postSubjectDetails } from '../../service/subjectService';
import { motherProps } from '../mothersDetails/MothersDetailsRoutes';
import { fatherProps } from '../fathersDetails/FathersDetailsRoutes';
import { userProps } from '../myDetails/MyDetailsRoutes';

jest.mock('../../service/subjectService');
jest.mock('axios');

const subjectProps = [motherProps, fatherProps, userProps];

const mother = {
  attributes: motherProps,
  keyValuePairs: {
    'First Name': 'Mary',
    'Last Name': 'Smith',
    'Maiden Name': 'Jones',
    Age: '50',
  },
  expectedPayload: {
    firstName: 'Mary',
    lastName: 'Smith',
    maidenName: 'Jones',
    age: '50',
  },
};

const father = {
  attributes: fatherProps,
  keyValuePairs: {
    'First Name': 'Michael',
    'Last Name': 'Jackson',
    Age: '50',
  },
  expectedPayload: {
    firstName: 'Michael',
    lastName: 'Jackson',
    age: '50',
  },
};

const myDetails = {
  attributes: userProps,
  keyValuePairs: {
    'First Name': 'Alex',
    'Last Name': 'Smith',
    Age: '20',
  },
  expectedPayload: {
    firstName: 'Alex',
    lastName: 'Smith',
    age: '20',
  },
};

const subjectDetails = [mother, father, myDetails];

const renderPage = async (props) => {
  const { subject, detailsHeader, legend } = props;
  render(
    <SubjectDetails
      subject={subject}
      detailsHeader={detailsHeader}
      legend={legend}
    />,
  );
};

describe('SubjectDetails', () => {
  subjectProps.forEach(async (subject) => {
    it('should make an api request to the right endpoint', async () => {
      await act(async () => {
        await renderPage(subject);
      });
      expect(getSubjectDetails.mockImplementation()).toHaveBeenCalledWith(subject.subject);
    });
  });

  it('should render four empty input fields if no data added yet', async () => {
    await renderPage(motherProps);

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

  subjectDetails.forEach(async (object) => {
    it('should be able to post and submit form details to the api', async () => {
      const { attributes, expectedPayload } = object;

      await act(async () => {
        await renderPage(attributes);
      });

      const button = screen.getByTestId('submit-button');
      const keys = Object.keys(object.keyValuePairs);

      await act(async () => {
        keys.forEach(async (key) => {
          await userEvent.type(screen.getByLabelText(key), object.keyValuePairs[key]);
        });
      });

      await act(async () => {
        userEvent.click(button);
      });

      expect(postSubjectDetails.mockImplementation())
        .toHaveBeenCalledWith(attributes.subject, expectedPayload);
    });
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
      await renderPage(motherProps);
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
