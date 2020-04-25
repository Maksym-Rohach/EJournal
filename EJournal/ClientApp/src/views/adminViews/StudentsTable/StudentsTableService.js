import axios from "axios";
import {serverUrl} from '../../../config';

export default class StudentsTableService {
    static getStudents(model) {
        return axios.get(`${serverUrl}api/admin/get/students/${model.specialityId}/${model.groupId}`)
    };
}