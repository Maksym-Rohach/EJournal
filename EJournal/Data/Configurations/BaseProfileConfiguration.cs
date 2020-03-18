﻿using EJournal.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.Configurations
{
    public class BaseProfileConfiguration : IEntityTypeConfiguration<BaseProfile>
    {
        public void Configure(EntityTypeBuilder<BaseProfile> builder)
        {
            builder.HasOne(e => e.DbUser)
                .WithOne(e => e.BaseProfile)
                .HasForeignKey<BaseProfile>(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Student)
                .WithOne(e => e.BaseProfile);

            builder.HasOne(e => e.Teacher)
                .WithOne(e => e.BaseProfile);
        }
    }
}
