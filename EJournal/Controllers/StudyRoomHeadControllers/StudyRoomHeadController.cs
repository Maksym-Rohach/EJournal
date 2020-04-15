using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EJournal.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.StudyRoomHeadControllers
{
    [Authorize(Roles = "StudyRoomHead")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudyRoomHeadController : ControllerBase
    {
        private readonly IStudents _students;

        public StudyRoomHeadController(IStudents students)
        {
            _students = students;
        }

        [HttpGet]
        [Route("get/allStudentsBySpeciality")]
        public IActionResult GetStudentsBySpecialities()
        {
            string teacherId = User.FindFirstValue("id");

            var students = _students.GetAllStudentsBySpecialities(teacherId);

            return Ok(students);
        }
    }
}