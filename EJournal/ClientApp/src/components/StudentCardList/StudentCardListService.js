import axios from "axios";
import {serverUrl} from '../../config';

export default class StudentCardListService {
    static getStudentListCard() {
        return axios.get(`${serverUrl}api/StudyRoomHead/get/allStudentsBySpeciality`)
    };
}