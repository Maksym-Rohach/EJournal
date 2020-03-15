﻿using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bogus;

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

                //TeacherProfile profile1 = new TeacherProfile
                //{
                //    Id = user1.Id,
                //    Name = "Дем’янюк Віктор Володимирович",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth=new DateTime(1983,6,23),
                //};
                //TeacherProfile profile2 = new TeacherProfile
                //{
                //    Id = user2.Id,
                //    Name = "Осадча Лариса Костянтинівна",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1983, 6, 23),
                //};
                
                //TeacherProfile profile3 = new TeacherProfile
                //{
                //    Id = user3.Id,
                //    Name = "Алексіюк Руслан Іванович",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1981, 3, 5),
                //};
                //TeacherProfile profile4 = new TeacherProfile
                //{
                //    Id = user4.Id,
                //    Name = "Вокальчук Євген Лукашович",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1983, 6, 23),
                //};
                //TeacherProfile profile5 = new TeacherProfile
                //{
                //    Id = user5.Id,
                //    Name = "Чачіна Галина Сергіївна",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1962, 2, 4),
                //};
                //TeacherProfile profile6 = new TeacherProfile
                //{
                //    Id = user6.Id,
                //    Name = "Володько Маргарита Володимирівна",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1983, 6, 23),
                //};
                //TeacherProfile profile7 = new TeacherProfile
                //{
                //    Id = user7.Id,
                //    Name = "Власюк Юлія Іллівна",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1961, 7, 12),
                //};
                //TeacherProfile profile8 = new TeacherProfile
                //{
                //    Id = user8.Id,
                //    Name = "Рейнська Вікторія Борисівна",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1983, 6, 23),
                //};
                //TeacherProfile profile9 = new TeacherProfile
                //{
                //    Id = user9.Id,
                //    Name = "Кондратюк Інна Володимирівна",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1983, 6, 23),
                //};
                //TeacherProfile profile10 = new TeacherProfile
                //{
                //    Id = user10.Id,
                //    Name = "Болтенко Надія Євгенівна",
                //    Address = "Pushkina 44, 12a",
                //    DateOfBirth = new DateTime(1983, 6, 23),
                //};
                //await context.UserProfiles.AddRangeAsync(profile1,profile2,profile3,profile4,
                //profile5,profile6,profile7,profile8);
                //await context.SaveChangesAsync();

                //Faker<StudentProfile> estatesFaked = new Faker<StudentProfile>()
                //            .RuleFor(t => t.Image, f => "unknown.jpg")
                //            .RuleFor(t => t.Address, f => Address.)
                //            .RuleFor(t => t.Name, f => f.Name.FullName());

                //var profiles = estatesFaked.Generate(20);
                //context.StudentProfile.AddRange(profiles);
                //await context.SaveChangesAsync();
            }
            catch (Exception)
            {

            }

        }
    }
}
