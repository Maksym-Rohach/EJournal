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
        [HttpGet("homepage")]
        public IActionResult GetHomePage()
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var res = new List<MarkViewModel>();
            res = _context.Marks.Where(x => x.StudentId == userId).Select(t => new MarkViewModel
            {
                Value = t.Value,
                Date = t.JournalColumn.Lesson.LessonDate.ToString("dd/MM/yyyy"),
                Subject = t.JournalColumn.Lesson.Subject.Name
            }).OrderBy(x=>x.Date).ToList();
            var avg = _context.Marks.Where(x => x.StudentId == userId && x.IsPresent == true).Average(x=>long.Parse(x.Value));
            var group = _context.Groups.FirstOrDefault(x => x.Id == _context.GroupsToStudents.FirstOrDefault(t => t.StudentId == userId && t.Group.YearTo.Year >= DateTime.Now.Year).GroupId);
            var count = _context.Marks.Where(x => x.StudentId == userId && x.IsPresent == false && x.JournalColumn.Lesson.GroupId == group.Id && x.JournalColumn.Lesson.LessonDate.Year == DateTime.Now.Year).Count();
            var lessons = _context.Lessons.Where(x => x.Group.Id == group.Id).Where(x => x.LessonDate.Day == DateTime.Now.Day&&x.LessonDate.Year==DateTime.Now.Year);
            List<TimetableModel> timetable = new List<TimetableModel>();
            timetable = lessons.Select(t => new TimetableModel()
            {
                AuditoriumNumber = "ауд " + t.Auditorium.Number.ToString(),
                LessonDate = t.LessonDate.Date.ToString(),
                TeacherName = t.Teacher.BaseProfile.Name + " " + t.Teacher.BaseProfile.LastName,
                LessonNumber = t.LessonNumber,
                Day = t.LessonDate.Day.ToString(),
                SubjectName = t.Subject.Name,
                LessonTimeGap = t.LessonTimeGap,
                Topic = t.JournalColumn.Topic
            }).OrderBy(x => x.LessonDate).ToList();
            return Ok(new HomePageViewModel()
            {
                Marks = res,
                AverageMark=avg.ToString(),
                CountOfDays=count.ToString(),
                Day=DateTime.Now.Day.ToString(),
                Timetable=timetable
            });
            
        }
    }
}