import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput, Form } from '.';

const renderPage = async (props) => {
  render(
    <Form>
      <TextInput title="First Name" name="firstName" value="" />
    </Form>,
  );
};

describe('TextInput validation', () => {
  it('should prompt user to fill in empty fields', async () => {
    await act(async () => {
      await renderPage();
    });

    const button = screen.getByTestId('submit-button');
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => 'From cannot be empty');
    await act(async () => {
      userEvent.click(button);
    });
    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});
