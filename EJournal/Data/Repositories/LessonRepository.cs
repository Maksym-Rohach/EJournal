using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class LessonRepository:ILessons
    {
        private readonly EfDbContext _context;
        public LessonRepository(EfDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Lesson> GetLessonsInGroup(int groupId, string date)
        {
            if(date!="")
                return _context.Lessons.Where(t => t.GroupId == groupId&&t.LessonDate==DateTime.Parse(date));

            return _context.Lessons.Where(t => t.GroupId == groupId);
        }

        public IEnumerable<string> GetSubjects()
        {
            return _context.Subjects.Select(t => t.Name);
        }

        public IEnumerable<Lesson> GetTeacherLessons(string teacherId, string date, int groupId)
        {
            var lessons= _context.Lessons.Where(t => t.TeacherId == teacherId);
            if (date != "")
                lessons=lessons.Where(t=>t.LessonDate == DateTime.Parse(date));
            if (groupId != 0)
                lessons = lessons.Where(t => t.GroupId == groupId );
            return lessons;
        }
    }
}
