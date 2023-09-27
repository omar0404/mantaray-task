import Config from 'react-native-config';
import axios from 'axios';
const Axios = axios.create({baseURL: Config.API_URL});

export default Axios;
