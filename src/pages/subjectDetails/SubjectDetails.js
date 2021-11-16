import React, { useState, useEffect } from 'react';
import {
  Page, Footer,
} from 'govuk-react';
import { getSubjectDetails, postSubjectDetails } from '../../service/subjectService';
import { TextInput, Form } from '../../components';

export default function SubjectDetails({ subject, detailsHeader, legend }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [maidenName, setMaidenName] = useState('');
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [maidenNameErrorMessage, setMaidenNameErrorMessage] = useState('');
  const [ageErrorMessage, setAgeErrorMessage] = useState('');

  useEffect(() => {
    setMaidenName('');
    const getMothersDetails = async () => {
      const res = await getSubjectDetails(subject);

      if (res) {
        const {
          firstName: name,
          lastName: surname,
          age: howOld,
          maidenName: mName,
        } = res.data;

        setFirstName(name);
        setLastName(surname);
        setAge(howOld);
        setMaidenName(mName);
      }
    };

    getMothersDetails();
  }, []);

  function handleInputValidation() {

  }
  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      firstName,
      lastName,
      age,
    };

    handleInputValidation();

    if (!firstName) {
      console.log('WE ARE IN HERE');
      setFirstNameErrorMessage('Your first name cant be blank');
    } else {
      setFirstNameErrorMessage('');
    }
    if (!lastName) {
      setLastNameErrorMessage('Your last name cant be blank');
    } else {
      setLastNameErrorMessage('');
    }
    if (!maidenName && subject === 'mother') {
      setMaidenNameErrorMessage('Your maiden name cant be blank');
    } else {
      setMaidenNameErrorMessage('');
    }
    if (!age) {
      setAgeErrorMessage('Your age cant be blank');
    } else {
      setAgeErrorMessage('');
    }

    if (subject === 'mother') payload.maidenName = maidenName;

    if (firstName && lastName && age) {
      postSubjectDetails(subject, payload);
    }
  };

  return (
    <>
      <Page>
        <div className="wrapper">
          <h2>{detailsHeader}</h2>
          <Form legend={legend} onSubmit={onSubmit}>
            <TextInput
              title="First Name"
              name="firstName"
              value={firstName}
              setValue={setFirstName}
              errorText={firstNameErrorMessage}
              onTextErrorChange={setFirstNameErrorMessage}
            />
            <TextInput
              title="Last Name"
              name="lastName"
              value={lastName}
              setValue={setLastName}
              errorText={lastNameErrorMessage}
              onTextErrorChange={setLastNameErrorMessage}
            />
            {subject === 'mother' && (
            <TextInput
              title="Maiden Name"
              name="maidenName"
              value={maidenName}
              setValue={setMaidenName}
              errorText={maidenNameErrorMessage}
              onTextErrorChange={setMaidenNameErrorMessage}
            />
            )}
            <TextInput
              title="Age"
              name="age"
              value={age}
              setValue={setAge}
              errorText={ageErrorMessage}
              onTextErrorChange={setAgeErrorMessage}
            />
          </Form>
        </div>
      </Page>
      <Footer />
    </>
  );
}
