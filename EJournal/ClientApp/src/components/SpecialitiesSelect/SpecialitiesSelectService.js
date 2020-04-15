import axios from "axios";
import {serverUrl} from '../../config';

export default class SpecialitiesSelectService {
    static getSpecialitiesSelect() {
        return axios.get(`${serverUrl}api/StudyRoomHead/get/specialitiesByStudyRoomHead`)        
    };
}