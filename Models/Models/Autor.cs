using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore;


namespace Models.Models
{
    public class Autor
    {
        [Key]
        public int AutorId { get; set; }

        [StringLength(100)]
        [Required]
        public string Nombre { get; set; }


        [StringLength(100)]
        [Required]
        public string Apellido { get; set; }
        public class Mapeo
        {
            public Mapeo(EntityTypeBuilder<Autor> mapeoAutor)
            {
                mapeoAutor.HasKey(x => x.AutorId);
                mapeoAutor.Property(x => x.Nombre).HasColumnName("Nombre");
                mapeoAutor.ToTable("Autor");
                //mapeoAutor.HasOne(x => x.Autor);
            }
        }
    }
}
