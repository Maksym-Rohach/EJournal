using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EJournal.Controllers.AdminControllers
{
    [Authorize(Roles = "Admin")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfDbContext _context;
        public AdminController(UserManager<DbUser> userManager, EfDbContext context)
        {
            _context = context;
            _userManager = userManager;
        }
        [HttpPost("addStudent")]
        public async Task<ActionResult<string>> AddStudent([FromBody] AddStudentModel model)
        {
            if (!ModelState.IsValid)
            {
                return "Введіть всі дані";
            }
            try
            {
                DbUser stud = new DbUser
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                };
                await _userManager.CreateAsync(stud, "Qwerty-1");
                await _userManager.AddToRoleAsync(stud, "Student");
                BaseProfile prof = new BaseProfile
                {
                    Id = stud.Id,
                    Name = model.Name,
                    LastName = model.LastName,
                    Surname = model.Surname,
                    Adress = model.Adress,
                    DateOfBirth = model.DateOfBirth
                };
                await _context.BaseProfiles.AddAsync(prof);
                await _context.SaveChangesAsync();
                await _context.StudentProfiles.AddAsync(new StudentProfile { Id = prof.Id });
                await _context.SaveChangesAsync();

                return Ok("Студент успішно доданий");
            }
            catch (Exception ex)
            {
                return BadRequest("Не корректні дані");
            }
        }
        [HttpPost("addTeacher")]
        public async Task<ActionResult<string>> AddTeacher([FromBody] AddTeacherModel model)
        {
            if (!ModelState.IsValid)
            {
                return "Введіть всі дані";
            }
            try
            {
                DbUser teach = new DbUser
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                };
                await _userManager.CreateAsync(teach, "Qwerty-1");
                await _userManager.AddToRoleAsync(teach, "Teacher");
                BaseProfile prof = new BaseProfile
                {
                    Id = teach.Id,
                    Name = model.Name,
                    LastName = model.LastName,
                    Surname = model.Surname,
                    Adress = model.Adress,
                    DateOfBirth = model.DateOfBirth
                };
                await _context.BaseProfiles.AddAsync(prof);
                await _context.SaveChangesAsync();
                await _context.TeacherProfiles.AddAsync(new TeacherProfile { Id = prof.Id,Degree=model.Degree });
                await _context.SaveChangesAsync();

                return Ok("Студент успішно доданий");
            }
            catch (Exception ex)
            {
                return BadRequest("Не корректні дані");
            }
        }
        [HttpGet("get/students")]
        public ContentResult GetStudents()
        {
            try
            {
                List<GetStudentsModel> list = _context.Users.Select(t=>new GetStudentsModel 
                { 
                    Email=t.Email,
                    PhoneNumber=t.PhoneNumber,
                    UserName=t.UserName,
                    Name=_context.BaseProfiles.FirstOrDefault(n=>n.Id==t.Id).Name,
                    Surname = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Surname,
                    LastName = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).LastName,
                    Adress=_context.BaseProfiles.FirstOrDefault(n=>n.Id==t.Id).Adress,
                    DateOfBirth= _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).DateOfBirth
                }).ToList();

                string json = JsonConvert.SerializeObject(list);

                return Content(json);
            }
            catch (Exception ex)
            {

                return Content("Error: " + ex.Message);
            }
        }
        [HttpGet("get/teachers")]
        public ContentResult GetTeachers()
        {
            try
            {
                List<GetTeacherModel> list = _context.Users.Select(t => new GetTeacherModel
                {
                    Email = t.Email,
                    PhoneNumber = t.PhoneNumber,
                    UserName = t.UserName,
                    Name = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Name,
                    Surname = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Surname,
                    LastName = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).LastName,
                    Adress = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Adress,
                    DateOfBirth = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).DateOfBirth,
                    Degree= _context.TeacherProfiles.FirstOrDefault(n => n.Id == t.Id).Degree
                }).ToList();

                string json = JsonConvert.SerializeObject(list);

                return Content(json);
            }
            catch (Exception ex)
            {

                return Content("Error: " + ex.Message);
            }
        }
    }

}