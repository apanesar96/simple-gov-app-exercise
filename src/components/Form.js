import React from 'react';
import {
  Input, Fieldset,
} from 'govuk-react';

export default function Form({ onSubmit, legend, children }) {
  // fucntion onFormSubmit(){

  //   values of your children && check not emty

  //   and then call

  //   onSubmit();
  // }

  // { title: 'First Name', name: 'firstName', value: '' }
  // console.log(children[0].props);
  // function onSubmit(e) {
  //   Array.prototype.forEach.call(children, (child) => {
  //     console.log(child.props);
  //   });
  // }

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
