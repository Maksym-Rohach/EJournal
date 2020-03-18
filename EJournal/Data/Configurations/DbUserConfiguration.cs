using EJournal.Data.Entities.AppUeser;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class DbUserConfiguration : IEntityTypeConfiguration<DbUser>
    {
        public void Configure(EntityTypeBuilder<DbUser> builder)
        {
            builder.HasMany(e => e.UserRoles)
                .WithOne(e => e.User);

            builder.HasOne(e => e.Student)
                .WithOne(e => e.User);

            builder.HasOne(e => e.Teacher)
                .WithOne(e => e.User);
        }
    }
}
