using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Models;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.StudentControllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Roles = "Student")]
    public class StudentController : ControllerBase
    {
        private readonly EfDbContext _context;
        public StudentController(EfDbContext context)
        {
            _context = context;
        }
        [HttpPost("get/timetable")]
        public IActionResult GetTimetable([FromBody]GetTimetableModel model)
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var now = DateTime.Now;           
            if (!string.IsNullOrEmpty(model.Month))
            {
                now = new DateTime(now.Year, int.Parse(model.Month), 1);
            }
            var group = _context.Groups.FirstOrDefault(x => x.Id == _context.GroupsToStudents.FirstOrDefault(t => t.StudentId == userId && t.Group.YearTo.Year >= now.Year).GroupId).Name;
            var lessons = _context.Lessons.Where(x=>x.Group.Name==group).Where(x=>x.LessonDate.Month== now.Month&& x.LessonDate.Year == now.Year);
            List<TimetableModel> timetable = new List<TimetableModel>();
            timetable = lessons.Select(t => new TimetableModel()
            {
                AuditoriumNumber = "ауд "+t.Auditorium.Number.ToString(),
                LessonDate = t.LessonDate.Date.ToString(),
                TeacherName = t.Teacher.BaseProfile.Name + " " + t.Teacher.BaseProfile.LastName,
                LessonNumber = t.LessonNumber,
                Day=t.LessonDate.Day.ToString(),
                SubjectName = t.Subject.Name,
                LessonTimeGap = t.LessonTimeGap,
                Topic=t.JournalColumn.Topic
            }).OrderBy(x=>x.LessonDate).ToList();
            var result = new TimetableViewModel()
            {
                DayOfWeek = new DateTime(now.Year, now.Month, 1).DayOfWeek.ToString(),
                DaysInMonth = DateTime.DaysInMonth(now.Year, now.Month).ToString(),
                Timetable = timetable
            };
            return Ok(result);
        }
    }
}