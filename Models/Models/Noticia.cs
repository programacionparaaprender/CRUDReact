using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore;


namespace Models.Models
{
    public class Noticia
    {
        [Key]
        public int NoticiaId { get; set; }

        [StringLength(100)]
        [Required]
        public string Titulo { get; set; }


        [StringLength(200)]
        [Required]
        public string Descripcion { get; set; }

        [StringLength(200)]
        [Required]
        public string Contenido { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        public int AutorId { get; set; }


        public Autor Autor { get; set; }

        public class Mapeo
        {
            public Mapeo(EntityTypeBuilder<Noticia> mapeoNoticia)
            {
                mapeoNoticia.HasKey(x => x.NoticiaId);
                mapeoNoticia.Property(x => x.Titulo).HasColumnName("Titulo");
                mapeoNoticia.ToTable("Noticia");
                mapeoNoticia.HasOne(x => x.Autor);
            }
        }

    }
}
