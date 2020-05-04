import axios from "axios";
import {serverUrl} from '../../../config';

export default class LoadDistributionService {
    static getGroups(model) {
        console.log("DDDDDDDDD",model)
        return axios.post(`${serverUrl}api/LoadDistribution/get-groups-spec`,model)
    };
}