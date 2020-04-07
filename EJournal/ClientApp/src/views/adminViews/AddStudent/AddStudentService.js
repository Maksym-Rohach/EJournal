import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddStudentService {
    static addStudent(model) {
        return axios.post(`${serverUrl}api/admin/adduser`, model)
    };
}