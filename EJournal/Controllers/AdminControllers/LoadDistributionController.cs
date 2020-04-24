using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Interfaces;
using EJournal.ViewModels.AdminViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.AdminControllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Roles = "Director,DDeputy")]
    public class LoadDistributionController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly IGroups _groupRepo;
        public LoadDistributionController(EfDbContext context, IGroups groupRepo)
        {
            _context = context;
            _groupRepo = groupRepo;
        }
        [HttpGet("get-groups")]
        public IActionResult GetGroups()
        {
            return Ok(_groupRepo.GetGroups());
        }
        [HttpPost("get-subjects")]
        public IActionResult GetSubjects([FromBody] FiltersModel model)
        {
            var subj = _context.GroupToSubjects.Where(x => x.GroupId == model.GroupId).Select(x => x.Subject);
            var res = subj.Select(x => new SubjectsModel()
            {
                Id = x.Id,
                Name = x.Name,
                Teachers = x.TeacherToSubjects.Select(t => new TeacherModel()
                {
                    Id = t.TeacherId,
                    Name = t.Teacher.BaseProfile.Name + " " + t.Teacher.BaseProfile.Surname + " " + t.Teacher.BaseProfile.LastName
                }).ToList()
            }).ToList();
            return Ok(new GetSubjectViewModel() {
                Group=model.GroupId.ToString(),
                Subjects=res
            });
        }
    }
}