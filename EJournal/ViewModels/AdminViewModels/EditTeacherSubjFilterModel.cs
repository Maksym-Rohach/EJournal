using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class EditTeacherSubjFilterModel
    {
        public string TeacherId { get; set; }
        public List<string> Subjects{ get; set; }
    }
}
