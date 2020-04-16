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
