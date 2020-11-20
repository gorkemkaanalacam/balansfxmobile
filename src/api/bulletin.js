import axios from 'axios';

export default axios.create({
  baseURL: 'https://webapi.balancefx.co.uk/Api',
});
