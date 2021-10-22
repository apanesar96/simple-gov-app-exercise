import { React, useState } from 'react';

import {
  Label, LabelText, Input, ErrorText,
} from 'govuk-react';

export default function TextInput({
  title, name, value, setValue, errorText,
}) {
  return (
    <div className="form-group">
      <Label>
        {errorText && (
          <ErrorText>{errorText}</ErrorText>
        )}
        <LabelText>
          {title}
        </LabelText>
        <Input name={name} defaultValue={value} onKeyUp={(e) => { setValue(e.target.value); }} />
      </Label>
    </div>
  );
}
