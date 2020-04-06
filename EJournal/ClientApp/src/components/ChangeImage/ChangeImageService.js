import axios from "axios";
import {serverUrl} from '../../config';

export default class ChangeImageService {
    static changeImage(model) {
        
        return axios.post(`${serverUrl}api/auth/changeimage`, model)
    };
}