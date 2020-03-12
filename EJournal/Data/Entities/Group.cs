using System;
using System.Collections.Generic;

namespace EJournal.Data.Entities
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime YearFrom { get; set; }
        public DateTime YearTo { get; set; }

        public string TeacherId { get; set; }
        public Teacher Teacher { get; set; }

        public ICollection<GroupToStudent> GroupToStudents { get; set; }
    }
}
