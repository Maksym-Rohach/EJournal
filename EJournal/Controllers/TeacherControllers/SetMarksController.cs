using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Interfaces;
using EJournal.ViewModels.TeacherViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Roles = "Teacher")]
    public class SetMarksController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly ILessons _lessonsRepo;
        private readonly IStudents _studentsRepo;
        public SetMarksController(EfDbContext context, ILessons lessonsRepo, IStudents studentsRepo)
        {
            _context = context;
            _lessonsRepo = lessonsRepo;
            _studentsRepo = studentsRepo;
        }
        [HttpPost("get-lessons")]
        public IActionResult GetLessons([FromBody] GetLessonsViewModel model)
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            if (!string.IsNullOrEmpty(model.Date))
            {
                return Ok(_lessonsRepo.GetTeacherLessons(userId, model.Date).OrderBy(x => x.LessonNumber).Select(x => new LessonViewModel
                {
                    Id = x.Id,
                    Group = x.Group.Name,
                    LessonNumber = x.LessonNumber,
                    LessonTimeGap = x.LessonTimeGap,
                    Subject = x.Subject.Name
                }));
            }
            else
            {
                return Ok(_lessonsRepo.GetTeacherLessons(userId, DateTime.Now.Date.ToString()).Select(x => new LessonViewModel
                {
                    Id = x.Id,
                    Group = x.Group.Name,
                    LessonNumber = x.LessonNumber,
                    LessonTimeGap = x.LessonTimeGap,
                    Subject = x.Subject.Name
                }).OrderBy(x => x.LessonNumber));
            }
        }
        [HttpPost("get-students")]
        public IActionResult GetStudents([FromBody] GetStudentsViewModel model)
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var group = _context.Lessons.FirstOrDefault(x => x.Id == int.Parse(model.LessonId)).GroupId;
            var jornalCol = _context.JournalColumns.FirstOrDefault(x => x.LessonId == int.Parse(model.LessonId));
            if (jornalCol == null)
            {
                _context.JournalColumns.Add(new Data.Entities.JournalColumn()
                {
                    JournalId = _context.Journals.FirstOrDefault(x => x.GroupId == group).Id,
                    LessonId = int.Parse(model.LessonId),
                    Topic = "",
                });
                _context.SaveChanges();
                //return Ok(_studentsRepo.GetStudents(group));
                return Ok(new StudentsViewModel()
                {
                    Students = _studentsRepo.GetStudents(group).Select(x => new StudentViewModel()
                    {
                        Id = x.Id,
                        Adress = x.Adress,
                        Name = x.Name,
                        LastName = x.LastName,
                    }),
                });
            }
            else
            {
                var marks = _context.Marks.Where(t => t.JournalColumnId == jornalCol.Id);
                var mr = _studentsRepo.GetStudents(group).Select(x => new StudentViewModel()
                {
                    Id = x.Id,
                    Adress = x.Adress,
                    Name = x.Name,
                    LastName = x.LastName,
                    Mark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1).Value,
                    ControlMark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3).Value,
                    IsPresent = marks.FirstOrDefault(t => t.StudentId == x.Id) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id).IsPresent.ToString()
                });
                return Ok(new StudentsViewModel()
                {
                    Students = mr,
                    Homework = jornalCol.Homework,
                    Topic = jornalCol.Topic
                });
            }
        }
        [HttpPost("change-topic")]
        public IActionResult ChangeTopic([FromBody]  ChangeTopicViewModel model)
        {
            _context.JournalColumns.FirstOrDefault(x => x.LessonId == int.Parse(model.LessonId)).Topic = model.Topic;
            _context.SaveChanges();
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var group = _context.Lessons.FirstOrDefault(x => x.Id == int.Parse(model.LessonId)).GroupId;
            var jornalCol = _context.JournalColumns.FirstOrDefault(x => x.LessonId == int.Parse(model.LessonId));
            var marks = _context.Marks.Where(t => t.JournalColumnId == jornalCol.Id);
            var mr = _studentsRepo.GetStudents(group).Select(x => new StudentViewModel()
            {
                Id = x.Id,
                Adress = x.Adress,
                Name = x.Name,
                LastName = x.LastName,
                Mark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1).Value,
                ControlMark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3).Value,
                IsPresent = marks.FirstOrDefault(t => t.StudentId == x.Id) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id).IsPresent.ToString()
            });
            return Ok(new StudentsViewModel()
            {
                Students = mr,
                Homework = jornalCol.Homework,
                Topic = jornalCol.Topic
            });
        }
        [HttpPost("change-homework")]
        public IActionResult ChangeHomework([FromBody]  ChangeHomeworkViewModel model)
        {
            _context.JournalColumns.FirstOrDefault(x => x.LessonId == int.Parse(model.LessonId)).Homework = model.Homework;
            _context.SaveChanges();
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var group = _context.Lessons.FirstOrDefault(x => x.Id == int.Parse(model.LessonId)).GroupId;
            var jornalCol = _context.JournalColumns.FirstOrDefault(x => x.LessonId == int.Parse(model.LessonId));
            var marks = _context.Marks.Where(t => t.JournalColumnId == jornalCol.Id);
            var mr = _studentsRepo.GetStudents(group).Select(x => new StudentViewModel()
            {
                Id = x.Id,
                Adress = x.Adress,
                Name = x.Name,
                LastName = x.LastName,
                Mark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1).Value,
                ControlMark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3).Value,
                IsPresent = marks.FirstOrDefault(t => t.StudentId == x.Id) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id).IsPresent.ToString()
            });
            return Ok(new StudentsViewModel()
            {
                Students = mr,
                Homework = jornalCol.Homework,
                Topic = jornalCol.Topic
            });
        }
        [HttpPost("change-mark")]
        public IActionResult ChangeMark([FromBody]  ChangeMarksViewModel model)
        {
            var jornalCol = _context.JournalColumns.FirstOrDefault(x => x.LessonId == int.Parse(model.LessonId));
            var mark = _context.Marks.FirstOrDefault(x => x.JournalColumn.LessonId == int.Parse(model.LessonId) &&
             x.StudentId == model.StudentId &&
             x.MarkTypeId == int.Parse(model.MarkType));
            if (mark == null)
            {
                _context.Marks.Add(new Data.Entities.Mark()
                {
                    JournalColumnId = jornalCol.Id,
                    IsPresent = true,
                    MarkTypeId = int.Parse(model.MarkType),
                    StudentId = model.StudentId,
                    Value = model.Mark
                });
            }
            else
            {
                mark.Value = model.Mark;
            }
            _context.SaveChanges();
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var group = _context.Lessons.FirstOrDefault(x => x.Id == int.Parse(model.LessonId)).GroupId;
            var marks = _context.Marks.Where(t => t.JournalColumnId == jornalCol.Id);
            var mr = _studentsRepo.GetStudents(group).Select(x => new StudentViewModel()
            {
                Id = x.Id,
                Adress = x.Adress,
                Name = x.Name,
                LastName = x.LastName,
                Mark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1).Value,
                ControlMark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3).Value,
                IsPresent = marks.FirstOrDefault(t => t.StudentId == x.Id) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id).IsPresent.ToString()
            });
            return Ok(new StudentsViewModel()
            {
                Students = mr,
                Homework = jornalCol.Homework,
                Topic = jornalCol.Topic
            });

        }
        [HttpPost("change-ispresent")]
        public IActionResult ChangeIsPresent([FromBody]  ChangeIsPresentViewModel model)
        {
            var jornalCol = _context.JournalColumns.FirstOrDefault(x => x.LessonId == int.Parse(model.LessonId));
            var mark = _context.Marks.FirstOrDefault(x => x.JournalColumn.LessonId == int.Parse(model.LessonId) &&
             x.StudentId == model.StudentId);
            if (bool.Parse(model.IsPresent) == false && mark != null)
            {
                var marksSt = _context.Marks.Where(x => x.JournalColumn.LessonId == int.Parse(model.LessonId) &&
             x.StudentId == model.StudentId);
                foreach (var el in marksSt)
                {
                    _context.Marks.Remove(el);
                    //el.IsPresent = false;
                    //el.Value = "0";
                }
            }
            if (bool.Parse(model.IsPresent) == true && mark != null)
            {
                var marksSt = _context.Marks.Where(x => x.JournalColumn.LessonId == int.Parse(model.LessonId) &&
             x.StudentId == model.StudentId && x.IsPresent == false);
                foreach (var el in marksSt)
                {
                    _context.Marks.Remove(el);
                    //el.IsPresent = false;
                    //el.Value = "0";
                }
            }
            //if (mark == null)
            //{
            _context.Marks.Add(new Data.Entities.Mark()
            {
                JournalColumnId = jornalCol.Id,
                IsPresent = bool.Parse(model.IsPresent),
                MarkTypeId = 1,
                StudentId = model.StudentId,
                Value = "0"
            });
            //}
            //else
            //{
            //    mark.IsPresent = bool.Parse(model.IsPresent);
            //}


            _context.SaveChanges();
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;
            var group = _context.Lessons.FirstOrDefault(x => x.Id == int.Parse(model.LessonId)).GroupId;
            var marks = _context.Marks.Where(t => t.JournalColumnId == jornalCol.Id);
            var mr = _studentsRepo.GetStudents(group).Select(x => new StudentViewModel()
            {
                Id = x.Id,
                Adress = x.Adress,
                Name = x.Name,
                LastName = x.LastName,
                Mark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 1).Value,
                ControlMark = marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id && t.MarkTypeId == 3).Value,
                IsPresent = marks.FirstOrDefault(t => t.StudentId == x.Id) == null ? null : marks.FirstOrDefault(t => t.StudentId == x.Id).IsPresent.ToString()
            });
            return Ok(new StudentsViewModel()
            {
                Students = mr,
                Homework = jornalCol.Homework,
                Topic = jornalCol.Topic
            });
        }

        [HttpGet("teacher/getexams")]
        public IActionResult GetExams()
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;

            var exam = new ExamRowModel()
            {
                GroupName = "Pr-12",
                Subject = "Programming",
                DateOfExam = "02.05.2020"
            };

            var listExams = new List<ExamRowModel>();
            listExams.Add(exam);

            var listrows = new GetExamViewModel()
            {
                rows = listExams,
            };

            

            //listrows.rows.Add(new ExamRowModel()
            //{
            //    GroupName = exam.GroupName,
            //    Subject = exam.Subject,
            //    DateOfExam = exam.DateOfExam
            //});

            return Ok(listrows);
        }
    }
}