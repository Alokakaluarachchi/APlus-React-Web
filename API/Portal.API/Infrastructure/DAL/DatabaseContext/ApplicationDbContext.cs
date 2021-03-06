﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Portal.API.Domain.BaseModels;
using Portal.API.Domain.DataBaseModels;
using Portal.API.Domain.IdentityModel;
using Portal.API.Infrastructure.DAL.Seeders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portal.API.Infrastructure.DAL.DatabaseContext
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<PasswordResetToken> passwordResetTokens { get; set; }
        public DbSet<CustomPermission> customPermissions { get; set; }
        public DbSet<CustomRolePermissionLevelc> customRolePermissionLevels { get; set; }
        public DbSet<CashierData> cashierDatas { get; set; }
        public DbSet<SupplierDetailsTable> supplierDetailsTables { get; set; }
        public DbSet<customer> customer { get; set; }
        public DbSet<Loyaity_card> loyaity_Card { get; set; }
        public DbSet<TransactionDetails> TransactionDetails { get; set; }
        public DbSet<SalaryDetails> SalaryDetails { get; set; }
        public DbSet<Branch> branches { get; set; }
        public DbSet<RequestAddTables> requestAddTable { get; set; }
        public DbSet<Organization> organizations { get; set; }
        public DbSet<Inventories> Inventories { get; set; }
        public DbSet<Attendances> attendances { get; set; }
        public DbSet<SignUpRequest> signUpRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Set model default values
            foreach (var entityType in builder.Model.GetEntityTypes()
                 .Where(t => t.ClrType.IsSubclassOf(typeof(BaseEntity))))
            {
                builder.Entity(
                        entityType.Name,
                        x =>
                        {
                            x.Property("RegistedDate")
                                .HasDefaultValueSql("GETDATE()");

                            x.Property("IsActive")
                                .HasDefaultValue(true);
                        });
            }

            //table configuration and data seeding
            builder.ApplyConfiguration(new CustomPermissionDataSet());
        }
    }

    

}


