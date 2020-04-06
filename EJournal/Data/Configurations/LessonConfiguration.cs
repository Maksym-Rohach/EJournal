using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace EJournal.Data.Configurations
{
    public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.Property(e => e.LessonDate)
               .IsRequired();

            builder.Property(e => e.LessonNumber)
               .IsRequired();

            builder.Property(e => e.LessonTimeGap)
               .IsRequired();

            builder.HasOne(e => e.Teacher)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Group)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.GroupId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Subject)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.JournalColumn)
                .WithOne(e => e.Lesson);

            builder.HasOne(e => e.Auditorium)
                .WithMany(e => e.Lessons)
                .HasForeignKey(e => e.AuditoriumId);

            builder.HasData(
                //new Lesson() { Id = 1, AuditoriumId = 10, GroupId = 1, LessonDate = new DateTime (2020, 3, 30), LessonNumber = 1, LessonTimeGap = "8.30 - 9.50", SubjectId = 4 /*TeacherId = "7fe110d7-33cc-4656-9805-60c93e5851ed" */ },
                //new Lesson() { Id = 2, AuditoriumId = 15, GroupId = 2, LessonDate = new DateTime (2020, 3, 30), LessonNumber = 2, LessonTimeGap = "10.00 - 11.20", SubjectId = 4 /*TeacherId = "7fe110d7-33cc-4656-9805-60c93e5851ed"*/ },
                //new Lesson() { Id = 3, AuditoriumId = 23, GroupId = 3, LessonDate = new DateTime(2020, 3, 30), LessonNumber = 3, LessonTimeGap = "11.30 - 12.50", SubjectId = 4 /*TeacherId = "7fe110d7-33cc-4656-9805-60c93e5851ed"*/ },
                //new Lesson() { Id = 4, AuditoriumId = 46, GroupId = 4, LessonDate = new DateTime(2020, 3, 30), LessonNumber = 4, LessonTimeGap = "13.20 - 14.30", SubjectId = 4 /*TeacherId = "7fe110d7-33cc-4656-9805-60c93e5851ed"*/ }
            );
        }
    }
}
