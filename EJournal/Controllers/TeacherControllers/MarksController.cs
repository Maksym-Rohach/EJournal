using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
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

        public MarksController(EfDbContext context, UserManager<DbUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("teacher/getmarks")]
        public IActionResult GetMarksCurator(GetMarksViewModel model)
        {
            try
            {
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }
    }
}