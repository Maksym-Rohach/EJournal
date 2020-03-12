using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace EJournal.Data.Entities.AppUeser
{
    public class DbUser : IdentityUser
    {
        public Teacher Teacher { get; set; }
        public Student Student { get; set; }

        public virtual ICollection<DbUserRole> UserRoles { get; set; }
    }
}
