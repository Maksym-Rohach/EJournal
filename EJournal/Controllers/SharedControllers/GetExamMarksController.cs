using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.Interfaces;
using EJournal.ViewModels.SharedViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.SharedControllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GetExamMarksController : ControllerBase
    {
        private readonly IMarks _marks;
        private readonly IStudents _students;

        public GetExamMarksController(IMarks marks, IStudents students)
        {
            _marks = marks;
            _students = students;
        }
        [HttpGet]
        [Route("get/exam/marks/studentId={studentId}")]
        public IActionResult GetExamMarks(string studentId)
        {
            var marks = _marks.GetExamStMarks(studentId);
            string grName = _students.GetGroupByStudentId(studentId).Name;
            var stud = _students.GetStudentById(studentId);
            string stName = stud.Name + " " + stud.LastName + " " + stud.Surname;
            if(marks!=null&&!String.IsNullOrEmpty(grName)&& !String.IsNullOrEmpty(stName))
            {
                return Ok(new GetMarksExamViewModel
                {
                    StudentName = stName,
                    GroupName = grName,
                    Models = marks
                });
            }
            return BadRequest("Помилка");
        }
    }
}