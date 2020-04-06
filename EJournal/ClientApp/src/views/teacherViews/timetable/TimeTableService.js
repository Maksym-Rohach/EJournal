import axios from "axios";
import {serverUrl} from '../../../config';

export default class TimeTableService {
    static getTimetable(model) {
       
        return axios.post(`${serverUrl}api/teacher/get/timetable`, model)
    };
}