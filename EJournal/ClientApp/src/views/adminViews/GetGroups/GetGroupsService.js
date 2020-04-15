import axios from "axios";
import {serverUrl} from '../../../config';

export default class GetGroupsService {
    static getGroups(model) {
        return axios.post(`${serverUrl}api/admin/get/groups`, model)
    };
}