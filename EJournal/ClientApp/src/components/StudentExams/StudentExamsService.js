import axios from "axios";
import {serverUrl} from '../../config';

export default class StudentExamsService {
    static getStudentExams(model) {
        return axios.get(`${serverUrl}api/GetExamMarks/get/exam/marks/studentId=${model.studentId}`)
    };
}