using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class GroupToStudentConfiguration : IEntityTypeConfiguration<GroupToStudent>
    {
        public void Configure(EntityTypeBuilder<GroupToStudent> builder)
        {
            builder.HasKey(x => new { x.GroupId, x.StudentId });

            builder.HasOne(e => e.Student)
                .WithMany(e => e.GroupToStudents)
                .HasForeignKey(e => e.StudentId)
                .IsRequired();

            builder.HasOne(e => e.Group)
                .WithMany(e => e.GroupToStudents)
                .HasForeignKey(e => e.GroupId)
                .IsRequired();

            builder.HasOne(e => e.Subgroup)
                .WithMany(e => e.GroupToStudents)
                .HasForeignKey(e => e.SubgroupId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
