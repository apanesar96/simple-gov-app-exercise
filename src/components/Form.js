import React from 'react';
import {
  Input, Fieldset,
} from 'govuk-react';

export default function Form({ onSubmit, legend, children }) {
  return (
    <form onSubmit={onSubmit}>
      <Fieldset>
        <Fieldset.Legend>{legend}</Fieldset.Legend>
        {children}
        <div className="form-group">
          <Input data-testid="submit-button" type="submit" />
        </div>
      </Fieldset>
    </form>
  );
}
