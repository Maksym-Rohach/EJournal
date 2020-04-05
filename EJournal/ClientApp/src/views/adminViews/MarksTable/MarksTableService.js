import axios from "axios";
import {serverUrl} from '../../../config';

export default class MarksTableService {
    static getMarks(model) {
        return axios.post(`${serverUrl}api/admin/get/marks`, model)
    };
}