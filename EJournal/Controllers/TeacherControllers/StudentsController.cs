using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Models;
using EJournal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EJournal.Controllers.TeacherControllers
{
    [Authorize(Roles = "Curator")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfDbContext _context;
        public StudentsController(UserManager<DbUser> userManager, EfDbContext context)
        {
            _context = context;
            _userManager = userManager;
        }
        [HttpPost("get/students")]
        public IActionResult GetStudentsAsync(StudentsFiltersModel model)
        {
            try
            {
                var query = _context.StudentProfiles.AsQueryable();
                List<CuratorCardStudentModel> cards = new List<CuratorCardStudentModel>();
                cards = query.Select(t => new CuratorCardStudentModel
                {
                    Name = t.BaseProfile.Name + " " + t.BaseProfile.LastName + " " + t.BaseProfile.Surname,
                    Progress = t.Marks.Count.ToString(),
                    Group = t.GroupToStudents.Last().Group.Name,
                    Speciality = t.GroupToStudents.Last().Group.Speciality.Name,
                    DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                    Phone = t.BaseProfile.DbUser.PhoneNumber,
                    Email = t.BaseProfile.DbUser.Email,
                    Address = t.BaseProfile.Adress

                }).ToList();
               


                return Ok(cards);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message + " I: " + ex.InnerException);
            }
        }
    }
}