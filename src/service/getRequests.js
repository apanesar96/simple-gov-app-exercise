import axios from 'axios';

export function fetchMotherDetails() {
  return axios.get('http://localhost:3004/mother');
}

function getFatherDetails() {

}

export default { fetchMotherDetails };
