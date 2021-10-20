import axios from 'axios';

export function getSubjectDetails(subject) {
  return axios.get(`http://localhost:3004/${subject}`);
}

export function postSubjectDetails(subject, payload) {
  axios.post(`http://localhost:3004/${subject}`, payload);
}

export default { getSubjectDetails, postSubjectDetails };
