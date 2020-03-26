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

            builder.HasMany(e => e.Lessons)
                .WithOne(e => e.Group);

            builder.HasOne(e => e.Speciality)
                .WithMany(e => e.Groups)
                .HasForeignKey(e => e.SpecialityId)
                .IsRequired();

            builder.HasData(
                new Group()
                {
                    Id = 1,
                    Name = "11-П",
                    YearFrom = new System.DateTime(2019, 9, 1),
                    YearTo = new System.DateTime(2023, 5, 29),
                    //TeacherId = "7330f282-e5b5-4836-9e71-f82d22ab64e8", 
                    SpecialityId = 1
                },
                new Group()
                {
                    Id = 2,
                    Name = "12-П",
                    YearFrom = new System.DateTime(2019, 9, 1),
                    YearTo = new System.DateTime(2023, 5, 29),
                    //TeacherId = "d51a3fd5-3590-4838-88c7-f00e01ab5e3f",
                    SpecialityId = 1
                }
                );
        }
    }
}
