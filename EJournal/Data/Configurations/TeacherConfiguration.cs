using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class TeacherConfiguration : IEntityTypeConfiguration<Teacher>
    {
        public void Configure(EntityTypeBuilder<Teacher> builder)
        {
            builder.Property(e => e.Degree)
                .HasMaxLength(256);

            builder.HasOne(e => e.User)
                .WithOne(e => e.Teacher)
                .HasForeignKey<Teacher>(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
