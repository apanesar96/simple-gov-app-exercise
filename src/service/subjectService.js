import axios from 'axios';

export function getSubjectDetails(subject) {
  return axios.get(`https://khtnodpb0c.execute-api.us-east-1.amazonaws.com/${subject}`);
}

export function postSubjectDetails(subject, payload) {
  axios.post(`https://khtnodpb0c.execute-api.us-east-1.amazonaws.com/${subject}`, payload);
}

export default { getSubjectDetails, postSubjectDetails };
