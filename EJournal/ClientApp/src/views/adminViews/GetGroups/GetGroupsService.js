import axios from "axios";
import {serverUrl} from '../../../config';

export default class GetGroupsService {
    static getGroups(model) {
        return axios.post(`${serverUrl}api/admin/get/groups`, model)
    };
    static getSpecialities() {
        return axios.get(`${serverUrl}api/admin/get/specialities`)
    };
    static getSpecialityTeachers(model) {
        return axios.post(`${serverUrl}api/admin/get/special/teachers`,model)
    };
    static deleteGroup(model) {
        return axios.delete(`${serverUrl}api/admin/delete/group/${model.groupId}`)
    };
    static editGroup(model) {
        return axios.post(`${serverUrl}api/admin/edit/group`,model)
    };
}