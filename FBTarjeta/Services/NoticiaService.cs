using Microsoft.EntityFrameworkCore;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Data;

namespace FBTarjeta.Services
{
    public class NoticiaService
    {
        private readonly ApplicationDbContext _applicationBDContext;
        public NoticiaService(ApplicationDbContext applicationBDContext)
        {
            this._applicationBDContext = applicationBDContext;
        }



        public List<Noticia> Obtener()
        {
           
            var resultado = _applicationBDContext.Notiticias.Include(x=>x.Autor).ToList();
            return resultado;
        }
        public Boolean agregarNoticia(Noticia _noticia)
        {
            try
            {
                _applicationBDContext.Notiticias.Add(_noticia);
                _applicationBDContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public Boolean editarNoticia(Noticia n)
        {
            try
            {
                var r = _applicationBDContext.Notiticias.Where(x=>x.NoticiaId == n.NoticiaId).FirstOrDefault();
                r.Titulo = n.Titulo;
                r.Descripcion = n.Titulo;
                r.Contenido = n.Contenido;
                r.Fecha = n.Fecha;
                r.AutorId = n.AutorId;
                _applicationBDContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Boolean eliminarNoticia(int NoticiaId)
        {
            try
            {
                var r = _applicationBDContext.Notiticias.Where(x => x.NoticiaId == NoticiaId).FirstOrDefault();
                _applicationBDContext.Remove(r);
                _applicationBDContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Noticia porNoticiaID(int NoticiaId)
        {
            try
            {
                var r = _applicationBDContext.Notiticias.Where(x => x.NoticiaId == NoticiaId).FirstOrDefault();
                return r;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        public bool ProcedimientoQueNoDevuelveDatos(int Edad, string Nombre)
        {
            int resultado = 0;
            try
            {
                string query = "spSinValoresDesdeProcedimiento @Edad={0}, @Nombre='{1}'";
                query = string.Format(query, Edad, Nombre);
                resultado = _applicationBDContext.Database.ExecuteSqlCommand(query);
            
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }


        public List<spMostrarNoticiasConAutor_Result> ObtenerNoticiasPorAutor(int idautor)
        {
            try
            {
                SqlParameter parametroAutor = new SqlParameter
                {
                    ParameterName = "idautor",
                    Value = idautor,
                    Direction = ParameterDirection.Input
                };
                var SQL = $"spMostrarNoticiasConAutor @idautor";

                var nombresRecibidosDeBaseDeDatos =
                _applicationBDContext.NotiticiasConAutor.FromSqlRaw(SQL, parametroAutor).ToList();
                
                return nombresRecibidosDeBaseDeDatos;
            }
            catch (Exception ex)
            {
                return new List<spMostrarNoticiasConAutor_Result>();
            }
        }


    }
}
