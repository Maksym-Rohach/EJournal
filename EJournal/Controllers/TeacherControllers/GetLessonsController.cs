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

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Teacher")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GetLessonsController : ControllerBase
    {
        private readonly EfDbContext _context;
        public GetLessonsController(EfDbContext context)
        {
            _context = context;
        }

        [HttpPost("get/timetable")]
        public IActionResult GetLessons([FromBody]GetTeacherTimetableMode model)
        {
            var claims = User.Claims;
            var id = claims.FirstOrDefault().Value;
            DateTime date_from = Convert.ToDateTime(model.dateFrom);
            DateTime date_To = Convert.ToDateTime(model.dateTo);
            var lessons = _context.Lessons.Where(l => l.LessonDate.Day >= date_from.Day && l.LessonDate.Day <= date_To.Day && l.LessonDate.Month >= date_from.Month && l.LessonDate.Month <= date_To.Month && l.LessonDate.Year >= date_from.Year && l.LessonDate.Year <= date_To.Year);
            List<TeacherTimeTableModel> timetable = new List<TeacherTimeTableModel>();
            timetable = lessons.Select(t => new TeacherTimeTableModel()
            {
                AuditoriumNumber = t.Auditorium.Number,
                DayOfWeek = t.LessonDate.DayOfWeek.ToString(),
                LessonNumber = t.LessonNumber,
                SubjectName = t.Subject.Name,
                LessonTimeGap = t.LessonTimeGap,
                GroupName = t.Group.Name,
                LessonDate = t.LessonDate.Date.ToString(),
                IsLessonBe = " "
            }).ToList();
            List<TeacherTimeTableModel> lesson1_ = new List<TeacherTimeTableModel>();
            List<TeacherTimeTableModel> lesson2_ = new List<TeacherTimeTableModel>();
            List<TeacherTimeTableModel> lesson3_ = new List<TeacherTimeTableModel>();
            List<TeacherTimeTableModel> lesson4_ = new List<TeacherTimeTableModel>();
            foreach (var item in timetable)
            {
                if (item.LessonDate == "" && item.DayOfWeek == "")
                {
                    item.IsLessonBe = "No";
                }
                if (item.LessonNumber == 1)
                {
                    lesson1_.Add(item);
                }
                else if (item.LessonNumber == 2)
                {
                    lesson2_.Add(item);
                }
                else if (item.LessonNumber == 3)
                {
                    lesson3_.Add(item);
                }
                else if (item.LessonNumber == 4)
                {
                    lesson4_.Add(item);
                }
            }
            var result = new GetTeacherTimetableViewMode()
            {
                lesson1 = lesson1_,
                lesson2 = lesson2_,
                lesson3 = lesson3_,
                lesson4 = lesson4_
            };
            return Ok(result);
        }
    }
}