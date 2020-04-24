﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using EJournal.ViewModels;
using EJournal.ViewModels.AdminViewModels;
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
        private readonly IStudents _students;
        private readonly ITeachers _teachers;
        private readonly IGroups _groups;
        private readonly ISpecialities _specialities;

        public AdminController(UserManager<DbUser> userManager, EfDbContext context, IStudents students, ITeachers teachers, IGroups groups,ISpecialities specialities)
        {
            _context = context;
            _userManager = userManager;
            _students = students;
            _teachers = teachers;
            _groups = groups;
            _specialities = specialities;
        }

        [HttpPost]
        [Route("adduser")]
        public async Task<ActionResult<string>> AddUser([FromBody] AddUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Введіть коректні дані");
            }
            if (model.Rolename.Contains("Student"))
            {
                bool res = await _students.AddStudentAsync(new AddStudentModel
                {
                    Name = model.Name,
                    GroupId=model.GroupId,
                    LastName = model.LastName,
                    Surname = model.Surname,
                    Adress = model.Adress,
                    DateOfBirth = model.DateOfBirth,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    //UserName=model.UserName,
                    IdentificationCode = model.IdentificationCode,
                    PassportString = model.PassportString
                });
                if (res == false)
                    return BadRequest("Помилка на етапі додавання");

                return Ok("Користувач успішно доданий");
            }
            else
            {
                bool res = await _teachers.AddTeacherAsync(new AddTeacherModel
                {
                    Rolename = model.Rolename,
                    //Degree = model.Degree,
                    Name = model.Name,
                    LastName = model.LastName,
                    Surname = model.Surname,
                    Adress = model.Adress,
                    DateOfBirth = model.DateOfBirth,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    //UserName = model.UserName,
                    IdentificationCode = model.IdentificationCode,
                    PassportString = model.PassportString
                });
                if (res == false)
                    return BadRequest("Помилка на етапі додавання");

                return Ok("Користувач успішно доданий");
            }
        }
        [HttpGet]
        [Route("get/roles")]
        public IActionResult GetRoles()
        {
            var roles = _teachers.GetRolesInDropdownModels();
            if (roles != null)
                return Ok(roles);
            else 
                return BadRequest();
        }
        [HttpGet]
        [Route("get/shortgroups")]
        public IActionResult GetDropdownGroups()
        {
            var groups = _groups.GetAllGroupsInfo();
            if (groups != null)
            { 
                return Ok(groups.Select(t=>new DropdownModel 
                {
                    Label=t.Name,
                    Value=t.Id.ToString()
                })); 
            }
            else
                return BadRequest();
        }
        [HttpPost]
        [Route("get/students")]
        public IActionResult GetStudents([FromBody]StudentsFiltersModel model)
        {
            try
            {
                AdminStudentsTableModel table = new AdminStudentsTableModel();
                var query = _students.GetFirstTenStudents().AsQueryable();
                List<AdminTableStudentRowModel> tableList = new List<AdminTableStudentRowModel>();
                if (model != null)
                {
                    //var groups = _context.Groups.Where(t => t.Speciality.Name == model.Speciality);
                    //var grToStud = _context.GroupsToStudents.Where(t => groups.Contains(t.Group));
                    if (model.SpecialityId != 0)
                    {
                        table.Groups = _context.Groups.Where(t => t.SpecialityId == model.SpecialityId).Select(t => new DropdownModel
                        {
                            Label = t.Name,
                            Value = t.Id.ToString()
                        }).ToList();
                    }
                    if (model.GroupId != 0)
                    {
                        table.Groups = _context.Groups.Where(t => t.SpecialityId == model.SpecialityId).Select(t => new DropdownModel
                        {
                            Label = t.Name,
                            Value = t.Id.ToString()
                        }).ToList();
                        query = _students.GetFirstTenStudents(model.GroupId).AsQueryable();
                    }
                }
                tableList = query.Select(t => new AdminTableStudentRowModel
                {
                    Name = t.Name + " " + t.LastName + " " + t.Surname,
                    Address = t.Adress,
                    DateOfBirth = t.DateOfBirth,
                    Email = t.Email,
                    Phone = t.PhoneNumber
                }).ToList();
                List<AdminTableColumnModel> cols = new List<AdminTableColumnModel>
                {
                    new AdminTableColumnModel{label="Name",field="name",sort="asc",width=300},
                    new AdminTableColumnModel{label="Phone",field="phone",sort="asc",width=150},
                    new AdminTableColumnModel{label="Birthday",field="dateOfBirth",sort="asc",width=150},
                    new AdminTableColumnModel{label="Email",field="email",sort="asc",width=200},
                    new AdminTableColumnModel{label="Address",field="address",sort="asc",width=170}
                };
                List<DropdownModel> specs = _context.Specialities.Select(t => new DropdownModel
                {
                    Label = t.Name,
                    Value = t.Id.ToString()
                }).ToList();

                table.rows = tableList;
                table.columns = cols;
                table.Specialities = specs;
                return Ok(table);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message + " I: " + ex.InnerException);
            }
        }
        [HttpPost]
        [Route("get/teachers")]
        public IActionResult GetTeachers([FromBody]TeacherFiltersModel model)
        {
            try
            {
                var query = _context.TeacherProfiles.AsQueryable();
                List<AdminTableTeacherRowModel> tableList = new List<AdminTableTeacherRowModel>();
                if (model != null)
                {
                    if (!String.IsNullOrEmpty(model.Rolename))
                    {
                        List<TeacherProfile> temp = new List<TeacherProfile>();
                        foreach (var item in _context.TeacherProfiles)
                        {
                            DbUser user = _context.Users.FirstOrDefault(t => t.Id == item.Id);
                            if (_userManager.GetRolesAsync(user).Result.Contains(model.Rolename))
                                temp.Add(item);
                        }
                        query = _context.TeacherProfiles.Where(t => temp.Contains(t)).AsQueryable();
                    }
                }
                tableList = query.Select(t => new AdminTableTeacherRowModel
                {//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmYjZjYTczLWU0ZGYtNDQ0Zi1hOWI1LTI1ZWY0OWFjZTI3OSIsIm5hbWUiOiJkaXJlY3RvciIsInJvbGVzIjoiRGlyZWN0b3IiLCJleHAiOjE1ODUyNjE2MTV9.pmdGudiz0rqOldnAZqUpN8jd--d7n7HFBJJ3748Ec3M
                    Name = t.BaseProfile.Name + " " + t.BaseProfile.LastName + " " + t.BaseProfile.Surname,
                    Address = t.BaseProfile.Adress,
                    DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                    Email = t.BaseProfile.DbUser.Email,
                    Phone = t.BaseProfile.DbUser.PhoneNumber,
                    Degree = t.Degree
                }).ToList();
                List<AdminTableColumnModel> cols = new List<AdminTableColumnModel>
                {
                    new AdminTableColumnModel{label="Name",field="name",sort="asc",width=250},
                    new AdminTableColumnModel{label="Phone",field="phone",sort="asc",width=150},
                    new AdminTableColumnModel{label="Birthday",field="dateOfBirth",sort="asc",width=150},
                    new AdminTableColumnModel{label="Email",field="email",sort="asc",width=150},
                    new AdminTableColumnModel{label="Address",field="address",sort="asc",width=150},
                    new AdminTableColumnModel{label="Degree",field="degree",sort="asc",width=120}
                };
                List<DropdownModel> roles = _context.Roles.Where(t => t.Name != "Student").Select(t => new DropdownModel
                {
                    Label = t.Name,
                    Value = t.Name
                }).ToList();
                AdminTeachersTableModel table = new AdminTeachersTableModel();
                table.rows = tableList;
                table.columns = cols;
                table.Roles = roles;

                return Ok(table);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message + " asd: " + ex.StackTrace);
            }
        }
        [HttpPost]
        [Route("get/marks")]
        public IActionResult GetMarks([FromBody]GetMarksFiltersModel model)
        {
            if (model != null)
            {
                AdminMarksTableModel table = new AdminMarksTableModel();
                if (model.SpecialityId != 0)
                {
                    table.Groups = _context.Groups.Where(t => t.SpecialityId == model.SpecialityId).Select(t => new DropdownModel
                    {
                        Label = t.Name,
                        Value = t.Id.ToString()
                    }).ToList();
                }
                if (model.GroupId != 0)
                {
                    table.Groups = _context.Groups.Where(t => t.SpecialityId == model.SpecialityId).Select(t => new DropdownModel
                    {
                        Label = t.Name,
                        Value = t.Id.ToString()
                    }).ToList();
                    table.Subjects = _context.GroupToSubjects.Where(t => t.GroupId == model.GroupId).Select(t => new DropdownModel
                    {
                        Label = t.Subject.Name,
                        Value = t.SubjectId.ToString()
                    }).ToList();
                }
                if (model.SubjectId != 0)
                {
                    List<AdminTableMarksRowModel> tableList = new List<AdminTableMarksRowModel>();
                    int jourId = _context.Journals.FirstOrDefault(t => t.GroupId == model.GroupId).Id;
                    var jourCols = _context.JournalColumns.Where(t => t.JournalId == jourId && t.Lesson.SubjectId == model.SubjectId);
                    var lessonDates = jourCols.Select(t => t.Lesson.LessonDate).ToList();
                    lessonDates.OrderByDescending(d => d);

                    var students = _context.GroupsToStudents.Where(t => t.GroupId == model.GroupId).Select(t => t.Student);
                    foreach (var item in students)
                    {
                        var studMarks = _context.Marks.Where(t => jourCols.Contains(t.JournalColumn) && t.StudentId == item.Id);
                        var marksFormatted = new List<string>();
                        foreach (var date in lessonDates)
                        {
                            var cell = studMarks.FirstOrDefault(m => m.JournalColumn.Lesson.LessonDate == date);
                            if (cell.IsPresent == true)
                                marksFormatted.Add(cell.Value);
                            else
                                marksFormatted.Add("-");
                        }
                        var baseP = _context.BaseProfiles.FirstOrDefault(t => t.Id == item.Id);
                        string name = baseP.Name + " " + baseP.LastName + " " + baseP.Surname;
                        AdminTableMarksRowModel rowModel = new AdminTableMarksRowModel
                        {
                            Name = name,
                            Marks = marksFormatted
                        };
                        tableList.Add(rowModel);
                    }
                    List<string> cols = new List<string>();
                    cols.Add("#");
                    cols.Add("ПІБ");
                    int lenght = lessonDates.Count;
                    //Set the count of cols
                    if (lenght > 7) lenght = 7;
                    for (int i = 0; i < lenght; i++)
                    {
                        cols.Add(lessonDates[i].ToString("dd.MM.yyyy"));
                    }

                    table.rows = tableList;
                    table.columns = cols;
                    table.Groups = _context.Groups.Where(t => t.SpecialityId == model.SpecialityId).Select(t => new DropdownModel
                    {
                        Label = t.Name,
                        Value = t.Id.ToString()
                    }).ToList();
                }
                List<DropdownModel> specs = _context.Specialities.Select(t => new DropdownModel
                {
                    Label = t.Name,
                    Value = t.Id.ToString()
                }).ToList();
                table.Specialities = specs;

                return Ok(table);
            }
            return BadRequest("Введені не всі дані");
        }
        [HttpPost]
        [Route("get/groups")]
        public IActionResult GetGroups([FromBody] GetGroupFiltersModel model)
        {
            var gr = _groups.GetGroupInfoBySpeciality(model.SpecialityId);
            if (gr != null)
                return Ok(gr);
            else return BadRequest("Error");
        }
        [HttpGet]
        [Route("get/specialities")]
        public IActionResult GetSpecialities()
        {
            var spec= _specialities.GetAllSpecialities().Select(t => new DropdownModel
            {
                Label=t.Name,
                Value=t.Id.ToString()
            });
            if (spec != null)
                return Ok(spec);
            else return BadRequest("Error");
        }
        [HttpPost]
        [Route("get/special/teachers")]
        public IActionResult GetSpecialityTeachers([FromBody]SpecialtyTeachersFilterModel model)
        {
            var curators=_teachers.GetCuratorsBySpeciality(model.SpecialityId);
            if (curators != null)
            {
                var res = curators.Select(t => new DropdownModel
                {
                    Label = t.Name,
                    Value = t.Id
                });
                return Ok(res);
            }
            else return BadRequest();
        }

        [HttpDelete]
        [Route("delete/group/{groupId}")]
        public IActionResult DeleteGroup(int groupId)
        {
            bool res = _groups.DeleteGroup(groupId);
            if (res)
                return Ok(res);
            else return BadRequest(res);
        }
        [HttpPost]
        [Route("edit/group")]
        public IActionResult EditGroup([FromBody]EditGroupFilterModel model)
        {
            bool res=_groups.EditGroup(model.TeacherId, model.GroupId, model.GroupName);
            if (res)
                return Ok("ok");
            else return BadRequest("ne ok");
        }
        [HttpPost]
        [Route("add/group")]
        public IActionResult AddGroup([FromBody] AddGroupFiltersModel model)
        {
            bool res=_groups.AddGroup(new AddGroupModel
            {
                Name=model.Name,
                SpecialityId=model.SpecialityId,
                TeacherId=model.TeacherId,
                DateFrom=DateTime.Parse(model.DateFrom),
                DateTo=DateTime.Parse(model.DateTo)
            });
            if (res)
                return Ok();
            else return BadRequest();
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