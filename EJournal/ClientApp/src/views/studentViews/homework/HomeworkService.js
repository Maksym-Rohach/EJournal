import axios from "axios";
import {serverUrl} from '../../../config';

export default class TimeTableService {
    static getData(model) {
        return axios.post(`${serverUrl}api/student/homework`,model)
    };
}