using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore;


namespace Models.Models
{
    public class spMostrarNoticiasConAutor_Result
    {
        [Key]
        public int noticiaId { get; set; }

        [StringLength(50)]
        [Required]
        public string Titulo { get; set; }

        [StringLength(100)]
        [Required]
        public string Descripcion { get; set; }

        [Required]
        public string Contenido { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [StringLength(100)]
        [Required]
        public string Autor { get; set; }
    }
}
