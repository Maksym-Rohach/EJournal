using EJournal.Data.EfContext;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EJournal.Data.Repositories
{
    public class GroupRepository : IGroups
    {
        private readonly EfDbContext _context;

        public GroupRepository(EfDbContext context)
        {
            _context = context;
        }

        public List<GetGroupInfoModel> GetGroupInfoBySpeciality(int specialityId)
        {
            List<GetGroupInfoModel> groups = _context.Groups
                .Where(x => x.SpecialityId == specialityId && (x.YearFrom.Year == DateTime.Now.Year || x.YearTo.Year == DateTime.Now.Year))
                .Select(s => new GetGroupInfoModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    CountOfStudents=s.GroupToSubjects.Count(),
                    NameOfCurator= s.Teacher.BaseProfile.LastName+" "+s.Teacher.BaseProfile.Name+" "+ s.Teacher.BaseProfile.Surname,
                    AverageMark=_context.Marks.Where(m=>s.GroupToStudents.Any(t=>m.StudentId==t.StudentId)).Select(t=>Convert.ToInt32(t.Value)).Sum()/
                    _context.Marks.Where(m => s.GroupToStudents.Any(t => m.StudentId == t.StudentId)).Count()
                })
                .ToList();
            return groups;
        }

        public List<GetGroupShortModel> GetGroupsBySpeciality(int specialityId)
        {
            List<GetGroupShortModel> groups = _context.Groups
                .Where(x => x.SpecialityId == specialityId && (x.YearFrom.Year == DateTime.Now.Year || x.YearTo.Year == DateTime.Now.Year))
                .Select(s => new GetGroupShortModel
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .ToList();

            return groups;
        }
    }
}
