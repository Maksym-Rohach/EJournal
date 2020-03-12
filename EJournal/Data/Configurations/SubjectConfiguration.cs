using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
    {
        public void Configure(EntityTypeBuilder<Subject> builder)
        {
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(64);

            builder.HasMany(e => e.TeacherToSubjects)
                .WithOne(e => e.Subject);
        }
    }
}
