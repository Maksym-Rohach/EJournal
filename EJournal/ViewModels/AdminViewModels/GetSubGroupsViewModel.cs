using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class GetSubGroupsViewModel
    {
        public List<GetSubgroupStudentModel> FirstSubGroup { get; set; }
        public List<GetSubgroupStudentModel> SecondSubGroup { get; set; }
    }
}
