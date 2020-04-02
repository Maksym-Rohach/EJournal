using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class JournalColumnConfiguration : IEntityTypeConfiguration<JournalColumn>
    {
        public void Configure(EntityTypeBuilder<JournalColumn> builder)
        {
            builder.Property(e => e.Topic)
                .IsRequired()
                .HasMaxLength(255);

            builder.HasMany(e => e.Marks)
                .WithOne(e => e.JournalColumn)
                .HasForeignKey(e => e.JournalColumnId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Lesson)
                .WithOne(e => e.JournalColumn)
                .HasForeignKey<JournalColumn>(e => e.LessonId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Journal)
                .WithMany(e => e.JournalColumns)
                .HasForeignKey(e => e.JournalId);

            builder.HasData(
                //new JournalColumn() { Id = 1, JournalId = 1, LessonId = 1, Topic = "Some topic 1" },
                //new JournalColumn() { Id = 2, JournalId = 1, LessonId = 2, Topic = "Some topic 2" },
                //new JournalColumn() { Id = 3, JournalId = 1, LessonId = 3, Topic = "Some topic 3" },
                //new JournalColumn() { Id = 4, JournalId = 1, LessonId = 4, Topic = "Some topic 4" }
            );
        }
    }
}
