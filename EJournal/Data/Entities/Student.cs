using EJournal.Data.Entities.AppUeser;
using System.Collections.Generic;

namespace EJournal.Data.Entities
{
    public class Student
    {
        public string Id { get; set; }

        public DbUser User { get; set; }
        public ICollection<GroupToStudent> GroupToStudents { get; set; }
    }
}
