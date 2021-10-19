import React from 'react';

import { Label, LabelText, Input } from 'govuk-react';

export default function InputField({ title }) {
  return (
    <div className="form-group">
      <Label>
        <LabelText>
          {title}
        </LabelText>
        <Input name="firstName" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </Label>
    </div>
  );
}
