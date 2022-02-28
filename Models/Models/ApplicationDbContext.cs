using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Data;


namespace Models.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        //public DbSet<Nombres> Nombres { get; set; }
        public DbSet<Autor> Autores { get; set; }
        public DbSet<Noticia> Notiticias { get; set; }

        public DbSet<TarjetaCredito> TarjetaCreditos { get; set; }

        public DbSet<spMostrarNoticiasConAutor_Result> NotiticiasConAutor { get; set; }

        protected override void OnModelCreating(ModelBuilder modeloCreador)
        {
            new Noticia.Mapeo(modeloCreador.Entity<Noticia>());
            new Autor.Mapeo(modeloCreador.Entity<Autor>());
            new TarjetaCredito.Mapeo(modeloCreador.Entity<TarjetaCredito>());
            modeloCreador.Entity<Autor>().HasIndex(p => new { p.Nombre, p.Apellido });
            base.OnModelCreating(modeloCreador);
        }

        
    }
}
