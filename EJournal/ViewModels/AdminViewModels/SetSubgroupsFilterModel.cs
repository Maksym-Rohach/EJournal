using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.ViewModels.AdminViewModels
{
    public class SetSubgroupsFilterModel
    {
        public List<string> FirstSubgroup { get; set; }
        public List<string> SecondSubgroup { get; set; }
        public int GroupId { get; set; }
    }
}
