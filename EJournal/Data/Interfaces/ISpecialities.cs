using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface ISpecialities
    {
        List<GetSpecialityModel> GetSpecialitiesByManager(string managerId); 
    }
}
