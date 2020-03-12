using EJournal.Data.Entities.AppUeser;
using System.Collections.Generic;

namespace EJournal.Data.Entities
{
    public class Teacher
    {
        public string Id { get; set; }
        public string Degree { get; set; }

        public DbUser User { get; set; }

        public ICollection<TeacherToSubject> TeacherToSubjects { get; set; }
        public ICollection<Group> Groups { get; set; }
    }
}
