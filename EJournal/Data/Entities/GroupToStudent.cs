using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class GroupToStudent
    {
        public int GroupId { get; set; }
        public Group Group { get; set; }

        public string StudentId { get; set; }
        public StudentProfile Student { get; set; }

        public int SubgroupId { get; set; }
        public Subgroup Subgroup { get; set; }
    }
}
