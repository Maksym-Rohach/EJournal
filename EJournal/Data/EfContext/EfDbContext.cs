using EJournal.Data.Configurations;
using EJournal.Data.Entities;
using EJournal.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EJournal.Data.EfContext
{
    public class EfDbContext : IdentityDbContext<DbUser, DbRole, string, IdentityUserClaim<string>,
    DbUserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EfDbContext(DbContextOptions<EfDbContext> options)
            : base(options)
        {

        }

        public DbSet<Auditorium> Auditoriums { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupToStudent> GroupsToStudents { get; set; }
        public DbSet<Journal> Journals { get; set; }
        public DbSet<JournalColumn> JournalColumns { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<MarkType> MarkTypes { get; set; }
        public DbSet<StudentProfile> StudentProfiles { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<TeacherProfile> TeacherProfiles { get; set; }
        public DbSet<TeacherToSubject> TeacherToSubjects { get; set; }
        public DbSet<BaseProfile> BaseProfiles { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<GroupToSubject> GroupToSubjects { get; set; }
        public DbSet<DeductedUser> DeductedUsers { get; set; }
        public DbSet<DeductionType> DeductionTypes { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<GroupNews> GroupNews { get; set; }
        public DbSet<LessonType> LessonTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new BaseProfileConfiguration());
            modelBuilder.ApplyConfiguration(new TeacherProfileConfiguration());
            modelBuilder.ApplyConfiguration(new StudentProfileConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserRoleConfiguration());
            modelBuilder.ApplyConfiguration(new DbUserConfiguration());
            modelBuilder.ApplyConfiguration(new DbRoleConfiguration());
            modelBuilder.ApplyConfiguration(new GroupConfiguration());
            modelBuilder.ApplyConfiguration(new GroupToStudentConfiguration());
            modelBuilder.ApplyConfiguration(new SubjectConfiguration());
            modelBuilder.ApplyConfiguration(new TeaherToSubjectConfiguration());
            modelBuilder.ApplyConfiguration(new AuditoriumConfiguration());
            modelBuilder.ApplyConfiguration(new JournalConfiguration());
            modelBuilder.ApplyConfiguration(new LessonConfiguration());
            modelBuilder.ApplyConfiguration(new JournalColumnConfiguration());
            modelBuilder.ApplyConfiguration(new MarkConfiguration());
            modelBuilder.ApplyConfiguration(new MarkTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SpecialityConfiguration());
            modelBuilder.ApplyConfiguration(new GroupToSubjectConfiguration());
            modelBuilder.ApplyConfiguration(new DeductedUserConfiguration());
            modelBuilder.ApplyConfiguration(new DeductionTypeConfiguration());
            modelBuilder.ApplyConfiguration(new NewsConfiguration());
            modelBuilder.ApplyConfiguration(new GroupNewsConfiguration());
            modelBuilder.ApplyConfiguration(new LessonTypeConfiguration());
        }
    }
}
