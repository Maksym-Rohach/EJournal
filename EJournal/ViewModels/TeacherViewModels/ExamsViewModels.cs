using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.TeacherViewModels
{
    public class GetExamViewModel
    {
        public List<ExamRowModel> rows { get; set; }
    }

    public class ExamRowModel
    {
        public string GroupName { get; set; }
        public string Subject { get; set; }
        public string DateOfExam { get; set; }
    } 
}
