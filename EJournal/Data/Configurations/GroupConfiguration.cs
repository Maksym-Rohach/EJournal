using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(64);

            builder.HasMany(e => e.GroupToStudents)
                .WithOne(e => e.Group);

            builder.HasOne(e => e.Teacher)
                .WithMany(e => e.Groups)
                .HasForeignKey(x => x.TeacherId);

            builder.HasOne(x => x.Journal)
                .WithOne(x => x.Group)
                .HasForeignKey<Journal>(x => x.GroupId);
        }
    }
}
