using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels
{
    public class GetTeacherTimetableViewMode
    {
        public List<TeacherTimeTableModel> lesson1 { get; set; }
        public List<TeacherTimeTableModel> lesson2 { get; set; }
        public List<TeacherTimeTableModel> lesson3 { get; set; }
        public List<TeacherTimeTableModel> lesson4 { get; set; }

    }
}
