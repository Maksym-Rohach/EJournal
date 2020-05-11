using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class MarkRepository : IMarks
    {
        private readonly EfDbContext _context;
        public MarkRepository(EfDbContext context)
        {
            _context = context;
        }

        public List<TabExamModel> GetExamStMarks(string studentId)
        {
            try
            {
                var jours = _context.Marks.Where(m => m.MarkTypeId == 4 && m.StudentId == studentId);
                var years = jours.Select(t => t.JournalColumn.Lesson.LessonDate.Year)
                    .Distinct().ToList();
                int yearNow = DateTime.Now.Year;
                if (years.Contains(yearNow) == false)
                    years.Add(yearNow);

                years = years.OrderByDescending(t => t).ToList();
                List<TabExamModel> res = new List<TabExamModel>();
                foreach (var item in years)
                {
                    List<GetExamMarksModel> temp = jours.Where(t => t.JournalColumn.Lesson.LessonDate.Year == item)
                        .Select(t => new GetExamMarksModel
                        {
                            Mark = t.Value,
                            Subject = t.JournalColumn.Lesson.Subject.Name,
                            DateOfProvide = t.JournalColumn.Lesson.LessonDate.ToString("dd.MM.yyyy"),
                            TeacherName = t.JournalColumn.Lesson.Teacher.BaseProfile.Name + " " +
                          t.JournalColumn.Lesson.Teacher.BaseProfile.LastName + " " +
                          t.JournalColumn.Lesson.Teacher.BaseProfile.Surname
                        }).ToList();
                    res.Add(new TabExamModel
                    {
                        Marks = temp,
                        YearOfMarks = item
                    });
                }
                return res;
            }
            catch (Exception)
            {
                return new List<TabExamModel>();
            }
            //var dude = jours.GroupBy(t => t.JournalColumn.Lesson.LessonDate.Year).Select(m => new TabExamModel
            //{
            //    Marks = m.Select(t => new GetExamMarksModel
            //    {
            //        Mark = t.Value,
            //        Subject = t.JournalColumn.Lesson.Subject.Name,
            //        DateOfProvide = t.JournalColumn.Lesson.LessonDate.ToString("dd.MM.yyyy"),
            //        TeacherName = t.JournalColumn.Lesson.Teacher.BaseProfile.Name + " " +
            //                      t.JournalColumn.Lesson.Teacher.BaseProfile.LastName + " " +
            //                      t.JournalColumn.Lesson.Teacher.BaseProfile.Surname
            //    }).ToList(),
            //    YearOfMarks=m.First().JournalColumn.Lesson.LessonDate.Year
            //}).ToList();
            //return dude;
        }

        public IEnumerable<Mark> GetMarksInGroup(int groupId, int subjectId, string date)
        {
            List<Mark> marks = new List<Mark>();
            int jourId = _context.Journals.FirstOrDefault(t => t.GroupId == groupId).Id;
            var marksCols = _context.JournalColumns.Where(t => t.JournalId == jourId && t.Lesson.SubjectId == subjectId && t.Lesson.LessonDate == DateTime.Parse(date))
                .Select(t => t.Marks);
            foreach (var item in marksCols)
            {
                marks.AddRange(item);
            }
            return marks;
        }

        public IEnumerable<MarkType> GetMarkTypes()
        {
            return _context.MarkTypes;
        }

        public IEnumerable<Mark> GetStudentMarks(string studentId, int subjectId, string date)
        {
            var marks = _context.Marks.Where(t => t.StudentId == studentId);
            if (subjectId != 0)
            {
                marks = marks.Where(t => t.JournalColumn.Lesson.SubjectId == subjectId);
            }
            else if (date != "")
            {
                marks = marks.Where(t => t.JournalColumn.Lesson.LessonDate == DateTime.Parse(date));
            }
            return marks;
        }
    }
}
