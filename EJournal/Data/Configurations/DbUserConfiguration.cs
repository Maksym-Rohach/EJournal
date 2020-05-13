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

            builder.HasMany(e => e.ForgotPasswordCodes)
                .WithOne(e => e.DbUser);

            builder.HasOne(e => e.BaseProfile)
                .WithOne(e => e.DbUser);
        }
    }
}
