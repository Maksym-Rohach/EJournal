using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class ForgotPasswordCodeConfiguration : IEntityTypeConfiguration<ForgotPasswordCode>
    {
        public void Configure(EntityTypeBuilder<ForgotPasswordCode> builder)
        {
            builder.Property(e => e.DateTo)
                .IsRequired();

            builder.Property(e => e.Code)
                .IsRequired();

            builder.Property(e => e.UserId)
                .IsRequired();

            builder.Property(e => e.IsActive)
                .IsRequired();

            builder.HasOne(e => e.DbUser)
                .WithMany(e => e.ForgotPasswordCodes)
                .HasForeignKey(e => e.UserId);
        }
    }
}
