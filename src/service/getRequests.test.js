import axios from 'axios';
import { fetchMotherDetails } from './getRequests';

jest.mock('axios');

describe('getRequests', () => {
  it('calls /mother the endpoint', () => {
    fetchMotherDetails();
    expect(axios.get.mockImplementation()).toHaveBeenCalledWith('http://localhost:3004/mother');
  });
});
