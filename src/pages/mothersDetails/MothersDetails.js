import React, { useState, useEffect } from 'react';
import {
  Input, Fieldset, Label, LabelText,
  Page, Footer,
} from 'govuk-react';
import { getSubjectDetails, postSubjectDetails } from '../../service/subjectService';

export default function MothersDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [maidenName, setMaidenName] = useState('');

  useEffect(() => {
    const getMothersDetails = async () => {
      const res = await getSubjectDetails('mother');

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
    postSubjectDetails('mother',
      {
        firstName, lastName, age, maidenName,
      });
  };

  return (
    <>
      <Page>
        <div className="wrapper">
          <h2>Your Mothers Details</h2>
          <form onSubmit={onSubmit}>
            <Fieldset>
              <Fieldset.Legend>Please enter her details</Fieldset.Legend>
              <div className="form-group">
                <Label>
                  <LabelText>
                    First Name
                  </LabelText>
                  <Input name="firstName" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Label>
              </div>
              <div className="form-group">
                <Label>
                  <LabelText>
                    Last Name
                  </LabelText>
                  <Input name="lastName" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Label>
              </div>
              <div className="form-group">
                <Label>
                  <LabelText>
                    Maiden Name
                  </LabelText>
                  <Input name="lastName" defaultValue={maidenName} onChange={(e) => setMaidenName(e.target.value)} />
                </Label>
              </div>
              <div className="form-group">
                <Label>
                  <LabelText>
                    Age
                  </LabelText>
                  <Input name="age" defaultValue={age} onChange={(e) => setAge(e.target.value)} />
                </Label>
              </div>
              <div className="form-group">
                <Input data-testid="submit-button" type="submit" />
              </div>
            </Fieldset>
          </form>
        </div>
      </Page>
      <Footer />
    </>
  );
}
