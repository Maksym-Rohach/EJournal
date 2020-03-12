using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class TeaherToSubjectConfiguration : IEntityTypeConfiguration<TeacherToSubject>
    {
        public void Configure(EntityTypeBuilder<TeacherToSubject> builder)
        {
            builder.HasKey(x => new { x.SubjectId, x.TeacherId });

            builder.HasOne(e => e.Subject)
                .WithMany(e => e.TeacherToSubjects)
                .HasForeignKey(e => e.SubjectId);

            builder.HasOne(e => e.Teacher)
                .WithMany(e => e.TeacherToSubjects)
                .HasForeignKey(e => e.TeacherId);
        }
    }
}
