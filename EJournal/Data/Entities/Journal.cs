using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class Journal
    {
        public int Id { get; set; }
        public int GroupId { get; set; }

        public Group Group { get; set; }


    }
}
