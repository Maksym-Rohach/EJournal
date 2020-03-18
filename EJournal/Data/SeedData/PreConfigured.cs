using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bogus;
using EJournal.Data.Entities;

namespace EJournal.Data.SeedData
{
    public class PreConfigured
    {
        public static void SeedRoles(RoleManager<DbRole> roleManager)
        {

            try
            {
                var roleName = "Director";
                var result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "Student";
                var result2 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "Teacher";
                var result3 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "EducMethodDeputy";
                var result4 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "EducDeputy";
                var result5 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "Curator";
                var result6 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "StudyRoomHead";
                var result7 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "DepartmentHead";
                var result8 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                roleName = "CycleCommisionHead";
                var result9 = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
            }
            catch (Exception)
            {

            }

        }
        public static async Task SeedUsers(UserManager<DbUser> userManager, EfDbContext context)
        {

            try
            {
                DbUser user1 = new DbUser
                {
                    UserName = "director",
                    Email = "beedirector@gmail.com",
                    PhoneNumber = "+380503334031",
                };

                DbUser user2 = new DbUser
                {
                    UserName = "emdeputy",
                    Email = "emdeputyninja@gmail.com",
                    PhoneNumber = "+380505551541",
                };

                DbUser user3 = new DbUser
                {
                    UserName = "edeputy",
                    Email = "neputy@gmail.com",
                    PhoneNumber = "+380453855561",
                };
                DbUser user4 = new DbUser
                {
                    UserName = "srhead",
                    Email = "spickof@gmail.com",
                    PhoneNumber = "+380395554292",
                };
                DbUser user5 = new DbUser
                {
                    UserName = "dhead",
                    Email = "hosihead@gmail.com",
                    PhoneNumber = "+380635554874",
                };
                DbUser user6 = new DbUser
                {
                    UserName = "dhead2",
                    Email = "margihead@gmail.com",
                    PhoneNumber = "+380975254814",
                };
                DbUser user7 = new DbUser
                {
                    UserName = "cchead",
                    Email = "micycle@gmail.com",
                    PhoneNumber = "+380440055588",
                };
                DbUser user8 = new DbUser
                {
                    UserName = "curator",
                    Email = "dudecurator@gmail.com",
                    PhoneNumber = "+380478655550",
                };
                DbUser user9 = new DbUser
                {
                    UserName = "curator",
                    Email = "dudecurator@gmail.com",
                    PhoneNumber = "+380478655550",
                };
                DbUser user10 = new DbUser
                {
                    UserName = "curator",
                    Email = "dudecurator@gmail.com",
                    PhoneNumber = "+380478655550",
                };
                await userManager.CreateAsync(user1, "Qwerty-1");
                await userManager.AddToRoleAsync(user1, "Director");

                await userManager.CreateAsync(user2, "Qwerty-1");
                await userManager.AddToRoleAsync(user2, "EducMethodDeputy");

                await userManager.CreateAsync(user3, "Qwerty-1");
                await userManager.AddToRoleAsync(user3, "EducDeputy");

                await userManager.CreateAsync(user4, "Qwerty-1");
                await userManager.AddToRoleAsync(user4, "StudyRoomHead");

                await userManager.CreateAsync(user5, "Qwerty-1");
                await userManager.AddToRoleAsync(user5, "DepartmentHead");

                await userManager.CreateAsync(user6, "Qwerty-1");
                await userManager.AddToRoleAsync(user6, "DepartmentHead");

                await userManager.CreateAsync(user7, "Qwerty-1");
                await userManager.AddToRoleAsync(user7, "CycleCommisionHead");

                await userManager.CreateAsync(user8, "Qwerty-1");
                await userManager.AddToRoleAsync(user8, "Curator");
                await userManager.CreateAsync(user9, "Qwerty-1");
                await userManager.AddToRoleAsync(user9, "Curator");
                await userManager.CreateAsync(user10, "Qwerty-1");
                await userManager.AddToRoleAsync(user10, "Curator");

                BaseProfile profile1 = new BaseProfile
                {
                    Id = user1.Id,
                    Name = "Віктор",
                    LastName = "Дем’янюк",
                    Surname = "Володимирович",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1983, 6, 23),
                };
                BaseProfile profile2 = new BaseProfile
                {
                    Id = user2.Id,
                    Name = "Лариса",
                    LastName = "Осадча",
                    Surname = "Костянтинівна",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1983, 6, 23),
                };

                BaseProfile profile3 = new BaseProfile
                {
                    Id = user3.Id,
                    Name = "Руслан",
                    LastName = "Алексіюк",
                    Surname = "Іванович",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1981, 3, 5),
                };
                BaseProfile profile4 = new BaseProfile
                {
                    Id = user4.Id,
                    Name = "Євген",
                    LastName = "Вокальчук",
                    Surname = "Лукашович",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1983, 6, 23),
                };
                BaseProfile profile5 = new BaseProfile
                {
                    Id = user5.Id,
                    Name = "Галина",
                    FirstName = "Чачіна",
                    Surname = "Сергіївна",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1962, 2, 4),
                };
                BaseProfile profile6 = new BaseProfile
                {
                    Id = user6.Id,
                    Name = "Маргарита",
                    FirstName = "Володько",
                    Surname = "Володимирівна",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1983, 6, 23),
                };
                BaseProfile profile7 = new BaseProfile
                {
                    Id = user7.Id,
                    Name = "Юлія",
                    LastName = "Власюк",
                    Surname = "Іллівна",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1961, 7, 12),
                };
                BaseProfile profile8 = new BaseProfile
                {
                    Id = user8.Id,
                    Name = "Вікторія",
                    LastName = "Рейнська",
                    Surname = "Борисівна",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1983, 6, 23),
                };
                BaseProfile profile9 = new BaseProfile
                {
                    Id = user9.Id,
                    Name = "Інна",
                    LastName = "Кондратюк",
                    Surname = "Володимирівна",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1983, 6, 23),
                };
                BaseProfile profile10 = new BaseProfile
                {
                    Id = user10.Id,
                    Name = "Надія",
                    LastName = "Болтенко",
                    Surname = "Євгенівна",
                    Address = "Pushkina 44, 12a",
                    DateOfBirth = new DateTime(1983, 6, 23),
                };
                await context.BaseProfiles.AddRangeAsync(profile1, profile2, profile3, profile4,
                profile5, profile6, profile7, profile8,profile9,profile10);
                await context.SaveChangesAsync();
                await context.StudentProfiles.AddRangeAsync(new StudentProfile { Id=profile1.Id}, 
                    new StudentProfile { Id = profile2.Id },new StudentProfile { Id = profile3.Id },
                    new StudentProfile { Id = profile4.Id }, new StudentProfile { Id = profile5.Id },
                    new StudentProfile { Id = profile6.Id }, new StudentProfile { Id = profile7.Id },
                    new StudentProfile { Id = profile8.Id }, new StudentProfile { Id = profile9.Id },
                    new StudentProfile { Id = profile10.Id });
                await context.SaveChangesAsync();
                //string[] middles =
                //{
                //    "Олександрович",
                //    "Валерійович",
                //    "Дмитрович",
                //    "Максимович",
                //    "Петрович",
                //    "Тарасович",
                //    "Богданович",
                //    "Миколайович",
                //    "Олексійович",
                //    "Ігорович",
                //    "Іванович",
                //    "В'ячеславович",
                //    "Станіславович",
                //    "Борисович",
                //    "Вадимович",
                //    "Артемович",
                //    "Вікторович",
                //    "Володимирович",
                //    "Григорійович",
                //    "Євгенович",
                //    "Казимирович",
                //    "Станіславович",
                //    "Валентинович"
                //};
                //var rand = new Random();
                //Faker<Student> estatesFaked = new Faker<Student>()
                //            .RuleFor(t => t.Address, f => f.Address.StreetAddress)
                //            .RuleFor(t => t.FirstName, f => f.Person.FirstName)
                //            .RuleFor(t => t.LastName, f => f.Person.LastName)
                //            .RuleFor(t => t.Middlename, f => middles[rand.Next(0, middles.Length)]);

                //var profiles = estatesFaked.Generate(20);
                //context.Students.AddRange(profiles);
                //await context.SaveChangesAsync();
            }
            catch (Exception)
            {

            }

        }
    }
}
