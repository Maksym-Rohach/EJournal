using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Interfaces;
using EJournal.Services;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Teacher")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MarksController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IMarks _marks;

        public MarksController(EfDbContext context, UserManager<DbUser> userManager, 
            IJwtTokenService jwtTokenService, IMarks marks)
        {
            _context = context;
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _marks = marks;
        }

        [HttpGet("teacher/getsubject")]
        public IActionResult GetSubject()
        {
            try
            {
                var claims = User.Claims;
                var userId = claims.FirstOrDefault().Value;
                //var curator = _context.TeacherProfiles.FirstOrDefault(x => x.Id == userId);
                var group = _context.Groups.FirstOrDefault(x => x.TeacherId == userId && (x.YearTo.Year == DateTime.Now.Year || x.YearFrom.Year == DateTime.Now.Year));
                List<SubjectsViewModel> subjects = _context.GroupToSubjects.Where(x => x.GroupId == group.Id)
                    .Select(x => new SubjectsViewModel
                    {
                        Name = x.Subject.Name
                    }).ToList();


                return Ok(subjects);
            }
            catch(Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        [HttpPost("teacher/getmarks")]
        public async Task<ActionResult<string>> GetMarksCurator([FromBody] GetMarksViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return "Виберіть предмет або місяць";
                }
                var claims = User.Claims;
                var userId = claims.FirstOrDefault().Value;
                var group = _context.Groups.FirstOrDefault(x => x.TeacherId == userId && (x.YearTo.Year == DateTime.Now.Year || x.YearFrom.Year == DateTime.Now.Year));

                var listMarks = new List<IEnumerable<Mark>>();
                for(int i=1; i<=31; i++)
                {
                    var data = $"{i}/{model.Month}/{DateTime.Now.Year}";
                    var marks = _marks.GetMarksInGroup(group.Id, model.SubjectId, data);
                    listMarks.Add(marks);
                }
                return Ok(listMarks);
            }
            catch(Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }
    }
}