import React from 'react';

import { Label, LabelText, Input } from 'govuk-react';

export default function InputField({
  title, name, value, setValue,
}) {
  return (
    <div className="form-group">
      <Label>
        <LabelText>
          {title}
        </LabelText>
        <Input name={name} defaultValue={value} onChange={(e) => setValue(e.target.value)} />
      </Label>
    </div>
  );
}
