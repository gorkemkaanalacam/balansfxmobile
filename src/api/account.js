import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.balancefx.co.uk/account',
});
