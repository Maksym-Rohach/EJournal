import axios from "axios";
import {serverUrl} from '../../../config';

export default class StudentsTableService {
    static getStudents(model) {
        console.log("StudentsTableService", model);
        return axios.post(`${serverUrl}api/admin/get/students`, model)
    };
}