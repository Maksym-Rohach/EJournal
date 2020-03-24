﻿using System;
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
    [Authorize(Roles = "Director")]
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

        [HttpPost("adduser")]
        public async Task<ActionResult<string>> AddUser([FromBody] AddUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Введіть коректні дані");
            }
            try
            {
                DbUser user = new DbUser
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                };
                BaseProfile prof = new BaseProfile
                {
                    Name = model.Name,
                    LastName = model.LastName,
                    Surname = model.Surname,
                    Adress = model.Adress,
                    DateOfBirth = Convert.ToDateTime(model.DateOfBirth)
                };
                
                switch (model.Rolename)
                {
                    case "Student":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "Student");
                        break;
                    case "Teacher":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "Teacher");
                        break;
                    case "Director":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "Director");
                        break;
                    case "Curator":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "Curator");
                        break;
                    case "Director deputy":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "DDeputy");
                        break;
                    case "Department head":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "DepartmentHead");
                        break;
                    case "Cycle commision head":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "CycleCommisionHead");
                        break;
                    case "Study room head":
                        await _userManager.CreateAsync(user, model.Password);
                        await _userManager.AddToRoleAsync(user, "StudyRoomHead");
                        break;
                    default:
                        return "Введіть правильну роль";
                }
                prof.Id = user.Id;
                await _context.BaseProfiles.AddAsync(prof);
                await _context.SaveChangesAsync();
                if (model.Rolename == "Student")
                {
                    await _context.StudentProfiles.AddAsync(new StudentProfile { Id = prof.Id });
                    await _context.SaveChangesAsync();
                }
                else
                {
                    await _context.TeacherProfiles.AddAsync(new TeacherProfile { Id = prof.Id, Degree = model.Degree });
                    await _context.SaveChangesAsync();
                }
                return Ok("Користувач успішно доданий");
            }
            catch (Exception ex)
            {
                return "Помилка: " + ex.Message;
            }
        }
        [HttpGet("get/students")]
        public ContentResult GetStudents()
        {
            try
            {
                List<AdminTableStudentRowModel> rows = _context.Users.Select(t => new AdminTableStudentRowModel
                {
                    Email = t.Email,
                    Phone = t.PhoneNumber,
                    Name = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Name+" "+
                    _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).LastName+" "+
                    _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Surname,
                    Address = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Adress,
                    DateOfBirth = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).DateOfBirth.ToString("dd.MM.yyyy")
                }).ToList();
                List<AdminTableColumnModel> cols = new List<AdminTableColumnModel>
                {
                    new AdminTableColumnModel{label="Name",field="Name",sort="asc",width=300},
                    new AdminTableColumnModel{label="Phone",field="Phone",sort="asc",width=150},
                    new AdminTableColumnModel{label="Birthday",field="DateOfBirth",sort="asc",width=150},
                    new AdminTableColumnModel{label="Email",field="Email",sort="asc",width=200},
                    new AdminTableColumnModel{label="Email",field="Email",sort="asc",width=170}
                };
                AdminStudentsTableModel table = new AdminStudentsTableModel { rows = rows, columns = cols };
                string json = JsonConvert.SerializeObject(table);

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
                List<AdminTableTeacherRowModel> rows = _context.Users.Select(t => new AdminTableTeacherRowModel
                {
                    Email = t.Email,
                    Phone = t.PhoneNumber,
                    Name = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Name + " " +
                    _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).LastName + " " +
                    _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Surname,
                    Address = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).Adress,
                    DateOfBirth = _context.BaseProfiles.FirstOrDefault(n => n.Id == t.Id).DateOfBirth.ToString("dd.MM.yyyy"),
                    Degree = _context.TeacherProfiles.FirstOrDefault(n => n.Id == t.Id).Degree
                }).ToList();
                List<AdminTableColumnModel> cols = new List<AdminTableColumnModel>
                {
                    new AdminTableColumnModel{label="Name",field="Name",sort="asc",width=250},
                    new AdminTableColumnModel{label="Phone",field="Phone",sort="asc",width=150},
                    new AdminTableColumnModel{label="Birthday",field="DateOfBirth",sort="asc",width=150},
                    new AdminTableColumnModel{label="Email",field="Email",sort="asc",width=150},
                    new AdminTableColumnModel{label="Email",field="Email",sort="asc",width=150},
                    new AdminTableColumnModel{label="Degree",field="Degree",sort="asc",width=120}
                };
                AdminTeachersTableModel table = new AdminTeachersTableModel { rows = rows, columns = cols };
                string json = JsonConvert.SerializeObject(table);

                return Content(json);
            }
            catch (Exception ex)
            {

                return Content("Error: " + ex.Message);
            }
        }
        //[HttpDelete("delete/{email}")]
        //public async Task<ContentResult> DeleteUserAsync(string email)
        //{
        //    try
        //    {
        //        DbUser user = _context.Users.FirstOrDefault(t => t.Email == email);
        //        if (_userManager.GetRolesAsync(user).Result.Contains("Student"))
        //        {
        //            _context.StudentProfiles.Remove(_context.StudentProfiles.FirstOrDefault(t => t.Id == user.Id));
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            _context.TeacherProfiles.Remove(_context.TeacherProfiles.FirstOrDefault(t => t.Id == user.Id));
        //            _context.SaveChanges();
        //        }
        //        _context.BaseProfiles.Remove(_context.BaseProfiles.FirstOrDefault(t => t.Id == user.Id));
        //        _context.SaveChanges();

        //        await _userManager.DeleteAsync(user);
        //        return Content("User is deleted");
        //    }
        //    catch (Exception ex)
        //    {
        //        return Content("Error" + ex.Message);
        //    }
        //}
    }

}