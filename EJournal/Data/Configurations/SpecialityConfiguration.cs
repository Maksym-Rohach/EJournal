using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace EJournal.Data.Configurations
{
    public class SpecialityConfiguration : IEntityTypeConfiguration<Speciality>
    {
        public void Configure(EntityTypeBuilder<Speciality> builder)
        {
            builder.HasMany(e => e.Groups)
                .WithOne(e => e.Speciality);

            builder.Property(e => e.Name)
                .HasMaxLength(100)
                .IsRequired();
        }
    }
}
