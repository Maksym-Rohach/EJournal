using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels
{
    public class HomePageViewModel
    {
        public List<MarkViewModel> Marks { get; set; }
        public List<TimetableModel> Timetable { get; set; }
        public string CountOfDays { get; set; }
        public string AverageMark { get; set; }
        public string Day { get; set; }
    }
}
