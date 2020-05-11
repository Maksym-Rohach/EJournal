using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Interfaces;
using EJournal.ViewModels.TeacherViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Teacher")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class LoadController : ControllerBase
    {
        private readonly EfDbContext _context;
        private readonly IGroups _groups;
        private readonly ILessons _lessons;

        public LoadController(EfDbContext context, IGroups groups, ILessons lessons)
        {
            _context = context;
            _groups = groups;
            _lessons = lessons;
        }

        [HttpGet]
        [Route("get/groups")]
        public IActionResult GetGroups()
        {
            var claims = User.Claims;
            var id = claims.FirstOrDefault().Value;
            var groups = _groups.GetGroupsByTeacherId(id).Select(t => new DropdownModel
            {
                Label = t.Name,
                Value = t.Id.ToString()
            });
            if (groups != null)
                return Ok(groups);
            else return BadRequest("Error");
        }

        [HttpGet]
        [Route("get/subjects")]
        public IActionResult GetSubjects(int groupId)
        {
            var claims = User.Claims;
            var id = claims.FirstOrDefault().Value;
            var subjects = _lessons.GetSubjectByTeacherId(id, groupId).Select(t => new DropdownModel
            {
                Label = t.Name,
                Value = t.Id.ToString()
            });
            if (subjects != null)
                return Ok(subjects);
            else return BadRequest("Error");
        }
    }
}