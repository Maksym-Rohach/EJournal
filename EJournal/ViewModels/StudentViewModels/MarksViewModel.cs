using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.StudentViewModels
{
    public class MarksViewModel
    {
        public List<MarksModel> Marks { get; set; }
    }
    public class GetMarksModel
    {
        public string Subject { get; set; }
        public string Date { get; set; }
    }
    public class MarksModel
    {
        public string Subject { get; set; }
        public string Value { get; set; }
        public string Date { get; set; }
        public int MarkType { get; set; }
    }
}
