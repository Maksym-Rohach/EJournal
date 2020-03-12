using EJournal.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<TeacherToSubject> TeacherToSubjects { get; set; }
    }
}
