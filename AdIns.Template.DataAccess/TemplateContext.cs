using AdIns.DataAccess;
using CoreSystemMini.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AdIns.Template.DataAccess.Context
{
    public class TemplateContext : BaseDbContext
    {
        public TemplateContext(DbContextOptions<TemplateContext> options) : base(options)
        {
        }

        public DbSet<Agrmnt> Agrmnt { get; set; }
        public DbSet<Debtor> Debtor { get; set; }
        public DbSet<InstSchdl> InstSchdl { get; set; }
        public DbSet<AgrmntAsset> AgrmntAsset { get; set; }
        public DbSet<RefAssetMaster> RefAssetMaster { get; set; }
        public DbSet<ColActivity> ColActivity { get; set; }
        public DbSet<PayHistH> PayHistH { get; set; }
        public DbSet<PayHistD> PayHistD { get; set; }
        public DbSet<SalesPerson> SalesPerson { get; set; }
        public DbSet<BusinessDt> BusinessDt { get; set; }
        public DbSet<MasterSequence> MasterSequence { get; set; }
        public DbSet<GeneralSettings> GeneralSettings { get; set; }

        protected virtual void OnModelPostgreSQLCreating(ModelBuilder modelBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            OnModelPostgreSQLCreating(modelBuilder);

            // Agrmnt → Debtor
            modelBuilder.Entity<Agrmnt>()
                .HasOne(a => a.Debtor)
                .WithMany(d => d.Agrmnts)
                .HasForeignKey(a => a.DebtorId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            // Agrmnt → SalesPerson (Restrict) 
            modelBuilder.Entity<Agrmnt>()
                .HasOne(a => a.SalesPerson)
                .WithMany(sp => sp.Agrmnts)
                .HasForeignKey(a => a.SalesPersonId)
                .OnDelete(DeleteBehavior.Restrict);

            // AgrmntAsset → Agrmnt (Cascade) 
            modelBuilder.Entity<AgrmntAsset>()
                .HasOne(aa => aa.Agrmnt)
                .WithMany(a => a.AgrmntAssets)
                .HasForeignKey(aa => aa.AgrmntId)
                .OnDelete(DeleteBehavior.Cascade);

            // AgrmntAsset → RefAssetMaster (Restrict) 
            modelBuilder.Entity<AgrmntAsset>()
                .HasOne(aa => aa.RefAssetMaster)
                .WithMany(ram => ram.AgrmntAssets)
                .HasForeignKey(aa => aa.RefAssetMasterId)
                .OnDelete(DeleteBehavior.Restrict);

            // InstSchdl → Agrmnt (Cascade) 
            modelBuilder.Entity<InstSchdl>()
                .HasOne(i => i.Agrmnt)
                .WithMany(a => a.InstSchdls)
                .HasForeignKey(i => i.AgrmntId)
                .OnDelete(DeleteBehavior.Cascade);

            // ColActivity → Agrmnt (Cascade) 
            modelBuilder.Entity<ColActivity>()
                .HasOne(c => c.Agrmnt)
                .WithMany(a => a.ColActivities)
                .HasForeignKey(c => c.AgrmntId)
                .OnDelete(DeleteBehavior.Cascade);

            // PayHistH → Agrmnt (Restrict) 
            modelBuilder.Entity<PayHistH>()
                .HasOne(p => p.Agrmnt)
                .WithMany(a => a.PayHistHs)
                .HasForeignKey(p => p.AgrmntId)
                .OnDelete(DeleteBehavior.Restrict);

            // PayHistD → PayHistH (Cascade) 
            modelBuilder.Entity<PayHistD>()
                .HasOne(pd => pd.PayHistH)
                .WithMany(ph => ph.PayHistDs)
                .HasForeignKey(pd => pd.PayHistHId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}