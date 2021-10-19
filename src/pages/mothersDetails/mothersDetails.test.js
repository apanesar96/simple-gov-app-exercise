import React from 'react';
import { render } from '@testing-library/react';
import { MothersDetails } from './MothersDetails';
import { fetchMotherDetails } from '../../service/getRequests';

jest.mock('../../service/getRequests');

const renderPage = async () => render(<MothersDetails />);

</BaseComponent person="Mother" />

describe('MothersDetails', () => {
  it('should make an api request to the /mother endpoint', async () => {
    await renderPage();
    expect(fetchMotherDetails.mockImplementation()).toHaveBeenCalled();
  });
});
