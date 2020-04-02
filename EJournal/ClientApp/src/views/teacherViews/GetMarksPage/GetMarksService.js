import axios from "axios";
import {serverUrl} from '../../../config';

export default class GetMarksService {
    static getStudents(model) {
        return axios.post(`${serverUrl}api/teacher/getmarks`, model)
    };

    static getSubject(){
        return axios.get(`${serverUrl}api/teacher/getmarks`);
    };
}