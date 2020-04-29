import axios from "axios";
import {serverUrl} from '../../../config';

export default class LoadDistributionService {
    static getGroups() {
        return axios.get(`${serverUrl}api/LoadDistribution/get-groups`)
    };
}