import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    const request = axios.get('/api/current_user');
}