using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EJournal.Data.Configurations
{
    public class JournalConfiguration : IEntityTypeConfiguration<Journal>
    {
        public void Configure(EntityTypeBuilder<Journal> builder)
        {
            builder.HasOne(e => e.Group)
                .WithOne(e => e.Journal);

            builder.HasMany(e => e.JournalColumns)
                .WithOne(e => e.Journal);
        }
    }
}
