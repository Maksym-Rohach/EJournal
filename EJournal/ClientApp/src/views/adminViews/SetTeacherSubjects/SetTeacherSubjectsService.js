import axios from "axios";
import {serverUrl} from '../../../config';

export default class SetTeacherSubjectsService {
    static getTeachers() {
        return axios.get(`${serverUrl}api/admin/get/shortteach`)
    };
    static getTeacherSubjects(model) {
        return axios.post(`${serverUrl}api/admin/get/teacher/subjects`,model)
    };
    static changeTeacherSubjects(model) {
        return axios.post(`${serverUrl}api/admin/change/teacher/subjects`,model)
    };
}