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

  useEffect(() => {
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

  const onSubmit = (event) => {
    event.preventDefault();

    if (firstName === "") {setFirstNameErrorMessage("Your first name cant be blank")};

    const payload = {
      firstName,
      lastName,
      age,
    };

    if (subject === 'mother') payload.maidenName = maidenName;

    postSubjectDetails(subject, payload);
  };

  return (
    <>
      <Page>
        <div className="wrapper">
          <h2>{detailsHeader}</h2>
          <Form legend={legend} onSubmit={onSubmit}>
            <TextInput title="First Name" name="firstName" value={firstName} setValue={setFirstName} errorText={firstNameErrorMessage}/>
            <TextInput title="Last Name" name="lastName" value={lastName} setValue={setLastName} />
            {subject === 'mother' && (
            <TextInput title="Maiden Name" name="maidenName" value={maidenName} setValue={setMaidenName} />
            )}
            <TextInput title="Age" name="age" value={age} setValue={setAge} />
          </Form>
        </div>
      </Page>
      <Footer />
    </>
  );
}
