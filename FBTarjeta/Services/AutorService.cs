using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FBTarjeta.Services
{
    public class AutorService
    {
        private readonly ApplicationDbContext _applicationBDContext;
        public AutorService(ApplicationDbContext applicationBDContext)
        {
            this._applicationBDContext = applicationBDContext;
        }


        public Boolean agregarAutor(Autor _autor)
        {
            int resultado = 0;
            try
            {
                _applicationBDContext.Autores.Add(_autor);
                resultado = _applicationBDContext.SaveChanges();
                if (resultado == 1)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Boolean editarAutor(Autor n)
        {
            try
            {
                var r = _applicationBDContext.Autores.Where(x => x.AutorId == n.AutorId).FirstOrDefault();
                r.Nombre = n.Nombre;
                r.Apellido = n.Apellido;
                _applicationBDContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Autor porAutorID(int AutorId)
        {
            try
            {
                IQueryable<Autor> query = _applicationBDContext.Autores.Where(x => x.AutorId == AutorId);
                Autor r = query.FirstOrDefault();
                return r;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<Autor> listadoDeAutores()
        {
            try
            {
                var r = _applicationBDContext.Autores.ToList();
                return r;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Boolean eliminarAutor(int AutorId)
        {
            int resultado = 0;
            try
            {
             
                var r = _applicationBDContext.Autores.Where(x => x.AutorId == AutorId).FirstOrDefault();
                _applicationBDContext.Remove(r);
                resultado = _applicationBDContext.SaveChanges();
                if (resultado == 1)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
