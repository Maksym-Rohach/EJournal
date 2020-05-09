import axios from "axios";
import {serverUrl} from '../../../config';

export default class SetExamService {
    static getExams(){
        return axios.get(`${serverUrl}api/setMarks/teacher/getexams`);
    };

    static getData(model){
        return axios.post(`${serverUrl}api/marks/teacher/get-data`, model);
    }
}