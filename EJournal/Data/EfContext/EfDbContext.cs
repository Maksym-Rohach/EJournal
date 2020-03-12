using EJournal.Data.Configurations;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new TeacherConfiguration());
            modelBuilder.ApplyConfiguration(new StudentConfiguration());
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
            //modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
