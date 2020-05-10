using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class GetExamMarksModel
    {
        public string Mark { get; set; }
        public string TeacherName { get; set; }
        public string DateOfProvide { get; set; }
        public string Subject { get; set; }
    }
}
