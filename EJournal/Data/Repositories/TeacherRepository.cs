using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class TeacherRepository : ITeachers
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfDbContext _context;
        public TeacherRepository(EfDbContext context, UserManager<DbUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<bool> AddTeacherAsync(AddTeacherModel profile)
        {
            try
            {
                DbUser user = new DbUser
                {
                    UserName = profile.UserName,
                    Email = profile.Email,
                    PhoneNumber = profile.PhoneNumber,
                };
                BaseProfile prof = new BaseProfile
                {
                    Name = profile.Name,
                    LastName = profile.LastName,
                    Surname = profile.Surname,
                    Adress = profile.Adress,
                    DateOfBirth = Convert.ToDateTime(profile.DateOfBirth)
                };
                switch (profile.Rolename)
                {
                    case "Teacher":
                        await _userManager.CreateAsync(user, profile.Password);
                        await _userManager.AddToRoleAsync(user, "Teacher");
                        break;
                    case "Director":
                        await _userManager.CreateAsync(user, profile.Password);
                        await _userManager.AddToRoleAsync(user, "Director");
                        break;
                    case "Curator":
                        await _userManager.CreateAsync(user, profile.Password);
                        await _userManager.AddToRoleAsync(user, "Curator");
                        break;
                    case "Director deputy":
                        await _userManager.CreateAsync(user, profile.Password);
                        await _userManager.AddToRoleAsync(user, "DDeputy");
                        break;
                    case "Department head":
                        await _userManager.CreateAsync(user, profile.Password);
                        await _userManager.AddToRoleAsync(user, "DepartmentHead");
                        break;
                    case "Cycle commision head":
                        await _userManager.CreateAsync(user, profile.Password);
                        await _userManager.AddToRoleAsync(user, "CycleCommisionHead");
                        break;
                    case "Study room head":
                        await _userManager.CreateAsync(user, profile.Password);
                        await _userManager.AddToRoleAsync(user, "StudyRoomHead");
                        break;
                    default:
                        return false;
                }
                prof.Id = user.Id;
                await _context.BaseProfiles.AddAsync(prof);
                await _context.SaveChangesAsync();

                await _context.TeacherProfiles.AddAsync(new TeacherProfile { Id = prof.Id, Degree = profile.Degree });
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public GetTeacherModel GetTeacherById(string id)
        {
            return _context.TeacherProfiles.Where(s => s.Id == id).Select(t => new GetTeacherModel
            {
                Id = t.Id,
                Email = t.BaseProfile.DbUser.Email,
                PhoneNumber = t.BaseProfile.DbUser.PhoneNumber,
                Name = t.BaseProfile.Name,
                LastName = t.BaseProfile.LastName,
                Surname = t.BaseProfile.Surname,
                Adress = t.BaseProfile.Adress,
                DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                Degree = t.Degree
            }).First();
        }

        public IEnumerable<GetTeacherModel> GetTeachers(string rolename)
        {
            List<TeacherProfile> temp = new List<TeacherProfile>();
            var users = _userManager.GetUsersInRoleAsync(rolename).Result;
            return users.Select(t => new GetTeacherModel
            {
                Id = t.Id,
                Email = t.Email,
                PhoneNumber = t.PhoneNumber,
                Name = t.BaseProfile.Name,
                LastName = t.BaseProfile.LastName,
                Surname = t.BaseProfile.Surname,
                Adress = t.BaseProfile.Adress,
                DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                Degree = t.BaseProfile.Teacher.Degree
            });
        }
    }
}
