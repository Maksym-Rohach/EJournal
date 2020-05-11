import axios from "axios";
import {serverUrl} from '../../config';

export default class TeacherLoadService {
    static getLoad(model) {
        return axios.get(`${serverUrl}api/load/get/load`, model)
    };
    static getGroups(){
        return axios.get(`${serverUrl}api/load/get/groups`)
    };
    static getSubjects(model){
        return axios.get(`${serverUrl}api/load/get/subjects`, model)
    };
}