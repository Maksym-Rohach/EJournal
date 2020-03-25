using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Models
{
    public class AdminGetMarksModel
    {
        public int LessonId { get; set; }
        public int GroupId { get; set; }
        public int SpecId { get; set; }
    }
}
