using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class Subgroup
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }

        public ICollection<GroupToStudent> GroupToStudents { get; set; }
    }
}
