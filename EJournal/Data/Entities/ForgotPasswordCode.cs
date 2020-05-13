using EJournal.Data.Entities.AppUeser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Entities
{
    public class ForgotPasswordCode
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public DateTime DateTo { get; set; }
        public bool IsActive { get; set; }


        public string UserId { get; set; }
        public DbUser DbUser { get; set; }
    }
}
