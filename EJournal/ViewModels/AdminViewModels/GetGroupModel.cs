using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class GetGroupModel
    {
        public string Name { get; set; }
        public string CountOfStudents { get; set; }
        public int AverageMark { get; set; }
        public string NameOfCurator { get; set; }
    }
}
