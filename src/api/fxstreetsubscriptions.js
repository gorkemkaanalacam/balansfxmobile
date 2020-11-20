import axios from 'axios';

export default axios.create({
  baseURL: 'https://subscriptions.fxstreet.com',
});
