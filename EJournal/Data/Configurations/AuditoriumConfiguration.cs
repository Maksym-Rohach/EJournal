using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class AuditoriumConfiguration : IEntityTypeConfiguration<Auditorium>
    {
        public void Configure(EntityTypeBuilder<Auditorium> builder)
        {
            builder.Property(p => p.Name)
                .HasMaxLength(64);

            builder.HasMany(e => e.Lessons)
                .WithOne(e => e.Auditorium);

            builder.Property(e => e.Name)
                .HasMaxLength(64)
                .IsRequired();
        }
    }
}
