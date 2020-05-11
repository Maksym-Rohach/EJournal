using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.SharedViewModels
{
    public class GetMarksExamViewModel
    {
        public string StudentName { get; set; }
        public string GroupName { get; set; }
        public List<TabExamModel> Models { get; set; }
    }
}
