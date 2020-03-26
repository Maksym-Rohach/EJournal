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

           // builder.HasData(
                //new GroupToStudent() { GroupId = 1, StudentId = "0106ab6b-39dd-4321-bd31-19b17366e3be" },
                //new GroupToStudent() { GroupId = 1, StudentId = "1657f5e1-8fc6-41fe-a626-887b0712f699" },
                //new GroupToStudent() { GroupId = 1, StudentId = "1a906e39-8b85-4dcd-835a-67ec2feca5b0" },
                //new GroupToStudent() { GroupId = 1, StudentId = "1b77ad34-2285-453f-a793-6b801ea34582" },
                //new GroupToStudent() { GroupId = 1, StudentId = "2d45d235-da1c-4c56-a8d2-f244def3660f" },
                //new GroupToStudent() { GroupId = 1, StudentId = "2d6e0355-80ac-4c63-b441-d94fd42bde74" },
                //new GroupToStudent() { GroupId = 1, StudentId = "30111997-79ff-45c9-9983-e8d8bfcedbe5" },
                //new GroupToStudent() { GroupId = 1, StudentId = "382c1a26-b08a-4214-af45-f3f25e661cdd" },
                //new GroupToStudent() { GroupId = 1, StudentId = "68f8528a-4d77-4263-8041-d3db134ca7b0" },
                //new GroupToStudent() { GroupId = 1, StudentId = "7330f282-e5b5-4836-9e71-f82d22ab64e8" },

                //new GroupToStudent() { GroupId = 2, StudentId = "7605f08f-93a8-452f-b665-035936089101" },
                //new GroupToStudent() { GroupId = 2, StudentId = "8d74a96a-16ca-4d44-bd46-ca6fc6606f08" },
                //new GroupToStudent() { GroupId = 2, StudentId = "99679973-8fdb-431a-9717-eeef398efcd0" },
                //new GroupToStudent() { GroupId = 2, StudentId = "a47884c8-2c1a-4192-94cf-43f34726a014" },
                //new GroupToStudent() { GroupId = 2, StudentId = "aeee37b1-c82d-4cfa-82e5-b702494c15f6" },
                //new GroupToStudent() { GroupId = 2, StudentId = "cb7e1ffa-750c-46a8-9d4c-ad8b77e23986" },
                //new GroupToStudent() { GroupId = 2, StudentId = "cca2276e-38ae-4f86-b75c-40d1389bed94" },
                //new GroupToStudent() { GroupId = 2, StudentId = "d2b0a7d2-628f-446b-a8ac-184366dc4961" },
                //new GroupToStudent() { GroupId = 2, StudentId = "db9f8ae8-9d64-4b9c-a135-ecb43c199746" },
                //new GroupToStudent() { GroupId = 2, StudentId = "ece0ceb5-5e47-429f-b6ef-80c4246f41db" }
                //);
        }
    }
}
