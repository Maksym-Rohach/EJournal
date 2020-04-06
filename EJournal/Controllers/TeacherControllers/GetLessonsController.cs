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
   // [Authorize(Roles = "Teacher")]
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
            var lessons = _context.Lessons.Where(l=>l.LessonDate.Day >= date_from.Day && l.LessonDate.Day <= date_To.Day && l.LessonDate.Month >= date_from.Month && l.LessonDate.Month <= date_To.Month && l.LessonDate.Year >= date_from.Year && l.LessonDate.Year <= date_To.Year);
            List<TeacherTimeTableModel> timetable = new List<TeacherTimeTableModel>();
            timetable = lessons.Select(t => new TeacherTimeTableModel()
            {
                AuditoriumNumber = t.Auditorium.Number,
                DayOfWeek = t.LessonDate.DayOfWeek.ToString(),
                LessonNumber = t.LessonNumber,
                SubjectName = t.Subject.Name,
                LessonTimeGap = t.LessonTimeGap,
            }).ToList();
            var result = new GetTeacherTimetableViewMode()
            {
                Timetable = timetable,
                
            };
            return Ok(result);
        }
    }
}