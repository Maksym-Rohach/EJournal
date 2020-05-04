using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using EJournal.Data.EfContext;
using EJournal.Data.Models;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
            DateTime date_to = Convert.ToDateTime(model.dateTo);
            var lessons = _context.Lessons.Where(l => DateTime.Compare(l.LessonDate, date_from) >= 0 && DateTime.Compare(l.LessonDate, date_to) <= 0 && l.TeacherId == id);
            List<TeacherTimeTableModel> timetable = new List<TeacherTimeTableModel>();
            timetable = lessons.Select(t => new TeacherTimeTableModel()
            {
                AuditoriumNumber = t.Auditorium.Number,
                DayOfWeek = t.LessonDate.DayOfWeek,
                LessonNumber = t.LessonNumber,
                SubjectName = t.Subject.Name,
                LessonTimeGap = t.LessonTimeGap,
                GroupName = t.Group.Name,
                LessonDate = t.LessonDate.Date.ToString("dd.MM.yyyy"),
                IsLessonBe = " "
            }).ToList();

            var res = new GetTeacherTimetableViewMode()
            {
                Timetable = timetable
            };
            return Ok(res);
            //List<TeacherTimeTableModel> lesson1_ = new List<TeacherTimeTableModel>();
            //List<TeacherTimeTableModel> lesson2_ = new List<TeacherTimeTableModel>();
            //List<TeacherTimeTableModel> lesson3_ = new List<TeacherTimeTableModel>();
            //List<TeacherTimeTableModel> lesson4_ = new List<TeacherTimeTableModel>();
            //List<DateTime> week = new List<DateTime>();
            //for (var i = date_from; i <= date_to; i = i.AddDays(1))
            //{
            //    week.Add(i);
            //}
            //foreach (var item in timetable)
            //{
            //    if (item.LessonNumber == 1)
            //    {
            //        lesson1_.Add(item);
            //    }
            //    else if (item.LessonNumber == 2)
            //    {
            //        lesson2_.Add(item);
            //    }
            //    else if (item.LessonNumber == 3)
            //    {
            //        lesson3_.Add(item);
            //    }
            //    else if (item.LessonNumber == 4)
            //    {
            //        lesson4_.Add(item);
            //    }
            //}
            //for (int i = 0; i < 7; i++)
            //{
            //    foreach (var day in week)
            //    {
            //        DateTime lessonDate = Convert.ToDateTime(lesson1_[i].LessonDate);
            //        if (lessonDate != day)
            //        {
            //            var lesson = new TeacherTimeTableModel();
            //            lesson.LessonDate = day.Date.ToString("dd.MM.yyyy");
            //            lesson.DayOfWeek = day.DayOfWeek;
            //            lesson.IsLessonBe = "No";
            //            lesson.LessonNumber = 1;
            //            lesson1_.Add(lesson);
            //        }
            //        else
            //        {
            //            lesson1_[i].IsLessonBe = "Yes";
            //        }
            //    }
            //    if (lesson1_.Count == 7)
            //    {
            //        break;
            //    }
            //}

            //List<DateTime> lessons2Dates = new List<DateTime>();
            //for(int i = 0; i < lesson2_.Count(); i++)
            //{
            //    lessons2Dates.Add(Convert.ToDateTime(lesson2_[i].LessonDate));
            //}
            //for (int i = 0; i < 7; i++)
            //{
            //    for (int j = 0; j < week.Count(); j++)
            //    {
            //        if (lessons2Dates[i] != week[j])
            //        {
            //            var lesson = new TeacherTimeTableModel();
            //            lesson.LessonDate = week[j].Date.ToString();
            //            lesson.DayOfWeek = week[j].DayOfWeek;
            //            lesson.IsLessonBe = "No";
            //            lesson.LessonNumber = 2;
            //            lesson2_.Add(lesson);
            //        }
            //        else 
            //        {
            //            lesson2_[i].IsLessonBe = "Yes";
            //        }
            //    }
            //    if (lesson2_.Count == 7)
            //    {
            //        break;
            //    }
            //}

            //List<DateTime> lessons3Dates = new List<DateTime>();
            //for (int i = 0; i < lesson3_.Count(); i++)
            //{
            //    lessons3Dates.Add(Convert.ToDateTime(lesson3_[i].LessonDate));
            //}
            //for (int i = 0; i < 7; i++)
            //{
            //    for (int j = 0; j < week.Count(); j++)
            //    {
            //        if (lessons3Dates[i] != week[j])
            //        {
            //            var lesson = new TeacherTimeTableModel();
            //            lesson.LessonDate = week[j].Date.ToString();
            //            lesson.DayOfWeek = week[j].DayOfWeek;
            //            lesson.IsLessonBe = "No";
            //            lesson.LessonNumber = 2;
            //            lesson3_.Add(lesson);
            //        }
            //        else
            //        {
            //            lesson3_[i].IsLessonBe = "Yes";
            //        }
            //    }
            //    if (lesson3_.Count == 7)
            //    {
            //        break;
            //    }
            //}

            //for (int i = 0; i < 7; i++)
            //{
            //    foreach (var day in week)
            //    {
            //        DateTime lessonDate = Convert.ToDateTime(lesson4_[i].LessonDate);
            //        if (lessonDate != day)
            //        {
            //            var lesson = new TeacherTimeTableModel();
            //            lesson.LessonDate = day.Date.ToString("dd.MM.yyyy");
            //            lesson.DayOfWeek = day.DayOfWeek;
            //            lesson.IsLessonBe = "No";
            //            lesson.LessonNumber = 4;
            //            lesson4_.Add(lesson);
            //        }
            //        else
            //        {
            //            lesson4_[i].IsLessonBe = "Yes";
            //        }
            //    }
            //    if (lesson4_.Count == 7)
            //    {
            //        break;
            //    }
            //}
            //var result = new GetTeacherTimetableViewMode()
            //{
            //    lesson1 = lesson1_,
            //    lesson2 = lesson2_,
            //    lesson3 = lesson3_,
            //    lesson4 = lesson4_
            //};


            //return Ok(result);
        }
    }
}