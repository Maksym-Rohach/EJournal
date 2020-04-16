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
                    CountOfStudents = s.GroupToSubjects.Count(),
                    NameOfCurator = s.Teacher.BaseProfile.LastName + " " + s.Teacher.BaseProfile.Name + " " + s.Teacher.BaseProfile.Surname
                })
                .ToList();
            foreach (var item in groups)
            {
                var marks = _context.GroupsToStudents.Where(t => t.GroupId == item.Id).SelectMany(t => t.Student.Marks);
                if (marks.Count() > 0)
                {
                    var formatted = marks.Select(m => Convert.ToInt32(m.Value));
                    double sum = formatted.Sum();
                    item.AverageMark = Math.Round(sum / marks.Count(),1);
                }
                else item.AverageMark = 0;
            }
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
