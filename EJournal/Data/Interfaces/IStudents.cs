using EJournal.Data.Entities;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Interfaces
{
    public interface IStudents
    {
        IEnumerable<GetStudentModel> GetStudents(int groupId=0);
        GetStudentModel GetStudentById(string id);
        Task<bool> AddStudentAsync(AddStudentModel profile);
        IEnumerable<string> GetSpecialities();
    }
}
