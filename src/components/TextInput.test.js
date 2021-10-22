import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput, Form } from '.';

const renderPage = async (title, inputName) => {
  render(
    <TextInput title={title} name={inputName} value="" />,
  );
};

describe('TextInput validation', () => {
  it('should create an input with a label', async () => {
    await renderPage('First Name', 'firstName');

    const input = screen.getByLabelText('First Name');
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should show error text if an error has occured', async () => {
    await render(
      <TextInput title="First Name" name="firstName" value="" errorText="Your first name cant be blank" />,
    );

    expect(screen.getByText('Your first name cant be blank')).toBeInTheDocument();
  });
});
