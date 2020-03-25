using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class AdminTableColumnModel
    {
        public string label { get; set; }
        public string field { get; set; }
        public string sort { get; set; }
        public int width { get; set; }
    }
}
