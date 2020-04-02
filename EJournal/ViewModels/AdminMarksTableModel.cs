using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels
{
    public class AdminMarksTableModel
    {
        public List<string> columns { get; set; }
        public List<AdminTableMarksRowModel> rows { get; set; }

        public List<DropdownIntModel> Specialities { get; set; }
        public List<DropdownIntModel> Groups { get; set; }
        public List<DropdownIntModel> Subjects { get; set; }
    }
}
