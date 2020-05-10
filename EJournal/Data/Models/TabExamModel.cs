using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class TabExamModel
    {
        public int YearOfMarks { get; set; }
        public List<GetExamMarksModel> Marks { get; set; }
    }
}
