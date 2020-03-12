using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.HasOne(e => e.User)
                .WithOne(e => e.Student)
                .HasForeignKey<Student>(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
