import axios from 'axios';
import { getSubjectDetails } from './subjectService';

jest.mock('axios');

describe('getRequests', () => {
  it('calls /mother the endpoint', () => {
    getSubjectDetails('mother');
    expect(axios.get.mockImplementation()).toHaveBeenCalledWith('http://localhost:3004/mother');
  });
});
