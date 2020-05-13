using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class SubgroupConfigutation : IEntityTypeConfiguration<Subgroup>
    {
        public void Configure(EntityTypeBuilder<Subgroup> builder)
        {
            builder.Property(e => e.Name)
                .HasMaxLength(50);

            builder.HasOne(e => e.Group)
                .WithMany(e => e.Subgroups)
                .HasForeignKey(e => e.GroupId);

            builder.HasMany(e => e.GroupToStudents)
                .WithOne(e => e.Subgroup);
        }
    }
}
