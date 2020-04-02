import axios from "axios";
import {serverUrl} from '../../config';

export default class TimeTableService {
    static changePassword(model) {
        
        return axios.post(`${serverUrl}api/auth/changepassword`, model.model)
    };
}