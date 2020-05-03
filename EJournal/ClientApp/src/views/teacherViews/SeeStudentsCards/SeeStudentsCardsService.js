import axios from "axios";
import {serverUrl} from '../../../config';

export default class SeeStudentsService {
    static seeStudents(model) {
       
        return axios.post(`${serverUrl}api/students/get/students`, model)
    };
}