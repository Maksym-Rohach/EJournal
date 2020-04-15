using EJournal.Data.EfContext;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using EJournal.Data.Interfaces;
using EJournal.Data.Models;
using EJournal.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Repositories
{
    public class StudentRepository : IStudents
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfDbContext _context;
        public StudentRepository(EfDbContext context, UserManager<DbUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<bool> AddStudentAsync(AddStudentModel profile)
        {
            try
            {
                DbUser user = new DbUser
                {
                    UserName = profile.Email/*profile.UserName*/,
                    Email = profile.Email,
                    PhoneNumber = profile.PhoneNumber,
                };
                BaseProfile prof = new BaseProfile
                {
                    Name = profile.Name,
                    LastName = profile.LastName,
                    Surname = profile.Surname,
                    Adress = profile.Adress,
                    DateOfBirth = Convert.ToDateTime(profile.DateOfBirth),
                    PassportString = profile.PassportString,
                    IdentificationCode = profile.IdentificationCode
                };
                string password = PasswordGenerator.GenerationPassword();
                await _userManager.CreateAsync(user, password);
                await _userManager.AddToRoleAsync(user, "Student");
                prof.Id = user.Id;
                await _context.BaseProfiles.AddAsync(prof);
                await _context.SaveChangesAsync();
                await _context.StudentProfiles.AddAsync(new StudentProfile { Id = prof.Id });
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public int CountOfTruancy(string studentId)
        {
            var group = _context.GroupsToStudents.FirstOrDefault(t => t.StudentId == studentId && t.Group.YearTo.Year >= DateTime.Now.Year).Group;
            var count = _context.Marks.Where(x => x.StudentId == studentId && x.IsPresent == false && x.JournalColumn.Lesson.GroupId == group.Id && x.JournalColumn.Lesson.LessonDate.Year == DateTime.Now.Year).Count();
            return count;
        }

        public IEnumerable<GetStudentModel> GetAllStudentsBySpecialities(string teacherId)
        {
            List<int> specialitiesId = _context.Specialities
                .Where(x => x.TeacherId == teacherId)
                .Select(x => x.Id).ToList();

            List<int> groupsId = new List<int>();

            for(int i = 0; i < specialitiesId.Count; i++)
            {
                List<int> groupId = _context.Groups
                    .Where(x => x.SpecialityId == specialitiesId[i] && (x.YearFrom.Year == DateTime.Now.Year || x.YearTo.Year == DateTime.Now.Year))
                    .Select(s => s.Id)
                    .ToList();

                groupsId.AddRange(groupId);
            }

            List<GetStudentModel> allStudents = new List<GetStudentModel>();

            for(int i = 0; i < groupsId.Count; i++)
            {
                List<GetStudentModel> studentsBySingleGroup = _context.GroupsToStudents
                    //.Include(x => x.Student.BaseProfile.DbUser)
                    .Where(x => x.GroupId == groupsId[i])
                    .Select(s => new GetStudentModel
                    {
                        Id = s.Student.BaseProfile.Id,
                        Name = s.Student.BaseProfile.Name,
                        Surname = s.Student.BaseProfile.Surname,
                        LastName = s.Student.BaseProfile.Adress,
                        DateOfBirth = s.Student.BaseProfile.DateOfBirth.ToString(),
                        Email = s.Student.BaseProfile.DbUser.Email,
                        PhoneNumber = s.Student.BaseProfile.DbUser.PhoneNumber
                    }).ToList();

                allStudents.AddRange(studentsBySingleGroup);
            }
            return allStudents;            
        }

        public int GetAverageMarkStudent(string studentId, int subjectId = 0)
        {
            var stMarks = _context.Marks.Where(t => t.StudentId == studentId);
            if (subjectId != 0)
                stMarks = stMarks.Where(t => t.JournalColumn.Lesson.SubjectId == subjectId);
            int lenght = stMarks.Count();
            return (stMarks.Select(t => Convert.ToInt32(t.Value)).Sum() / lenght);
        }

        public IEnumerable<GetStudentModel> GetFirstTenStudents(int groupId)
        {
            if (groupId == 0)
            {
                var students = _context.StudentProfiles.Take(10).Select(t => new GetStudentModel
                {
                    Name = t.BaseProfile.Name,
                    LastName = t.BaseProfile.LastName,
                    Surname = t.BaseProfile.Surname,
                    Adress = t.BaseProfile.Adress,
                    DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                    Email = t.BaseProfile.DbUser.Email,
                    PhoneNumber = t.BaseProfile.DbUser.PhoneNumber
                });
                return students;
            }
            else
            {
                var students = _context.GroupsToStudents.Where(t => t.GroupId == groupId).Select(t => t.Student)
                    .Take(10).Select(t => new GetStudentModel
                    {
                        Name = t.BaseProfile.Name,
                        LastName = t.BaseProfile.LastName,
                        Surname = t.BaseProfile.Surname,
                        Adress = t.BaseProfile.Adress,
                        DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy"),
                        Email = t.BaseProfile.DbUser.Email,
                        PhoneNumber = t.BaseProfile.DbUser.PhoneNumber
                    }); 
                return students;
            }
            //students.OrderByDescending(t => t.DateOfRegister);
        }

        public IEnumerable<string> GetSpecialities()
        {
            return _context.Specialities.Select(t => t.Name);
        }

        public GetStudentModel GetStudentById(string id)
        {
            return _context.StudentProfiles.Where(s => s.Id == id).Select(t => new GetStudentModel
            {
                Id = t.Id,
                Email = t.BaseProfile.DbUser.Email,
                PhoneNumber = t.BaseProfile.DbUser.PhoneNumber,
                Name = t.BaseProfile.Name,
                LastName = t.BaseProfile.LastName,
                Surname = t.BaseProfile.Surname,
                Adress = t.BaseProfile.Adress,
                DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy")
            }).First();
        }

        public IEnumerable<GetStudentModel> GetStudents(int groupId)
        {
            if (groupId == 0)
            {
                return _context.StudentProfiles.Select(t => new GetStudentModel
                {
                    Id = t.Id,
                    Email = t.BaseProfile.DbUser.Email,
                    PhoneNumber = t.BaseProfile.DbUser.PhoneNumber,
                    Name = t.BaseProfile.Name,
                    LastName = t.BaseProfile.LastName,
                    Surname = t.BaseProfile.Surname,
                    Adress = t.BaseProfile.Adress,
                    DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy")
                });
            }
            else
            {
                return _context.GroupsToStudents.Where(g => g.GroupId == groupId)
                .Select(t => t.Student)
                .Select(t => new GetStudentModel
                {
                    Id = t.Id,
                    Email = t.BaseProfile.DbUser.Email,
                    PhoneNumber = t.BaseProfile.DbUser.PhoneNumber,
                    Name = t.BaseProfile.Name,
                    LastName = t.BaseProfile.LastName,
                    Surname = t.BaseProfile.Surname,
                    Adress = t.BaseProfile.Adress,
                    DateOfBirth = t.BaseProfile.DateOfBirth.ToString("dd.MM.yyyy")
                });
            }
        }
    }
}
