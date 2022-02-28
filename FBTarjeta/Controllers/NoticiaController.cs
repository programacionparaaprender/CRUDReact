using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using FBTarjeta.Services;
using System.Text.Json;


namespace FBTarjeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly NoticiaService _noticiaService;
        public NoticiaController(NoticiaService noticiaService)
        {
            this._noticiaService = noticiaService;
        }
        [HttpGet]
        [Route("verNoticias")]
        public IActionResult verNoticias()
        {
            var resultado = _noticiaService.Obtener();
            //return Ok("Prueba de que todo funciona");
            //return HttpResult(200, resultado);
            return Ok(resultado);
            //return StatusCode(200, JsonSerializer.Serialize(resultado));
        }

        [HttpGet]
        [Route("porNoticiaID/{noticiaID}")]
        public IActionResult porNoticiaID(int noticiaID)
        {
            var resultado = _noticiaService.porNoticiaID(noticiaID);
            //return Ok("Prueba de que todo funciona");
            //return HttpResult(200, resultado);
            return Ok(resultado);
        }
        [HttpPost]
        [Route("agregar")]
        public IActionResult agregar([FromBody] Noticia _noticia)
        {
            try
            {
                var resultado = _noticiaService.agregarNoticia(_noticia);
                //return Ok("Prueba de que todo funciona");
                //return HttpResult(200, resultado);
                if(resultado)
                    return Ok(resultado);
            }
            catch(Exception ex)
            {

            }
            return BadRequest();
        }
        [HttpPut]
        [Route("editar")]
        public IActionResult editar([FromBody] Noticia _noticia)
        {
            try
            {
                //_noticia.NoticiaId = id;
                var resultado = _noticiaService.editarNoticia(_noticia);
                //return Ok("Prueba de que todo funciona");
                //return HttpResult(200, resultado);
                if (resultado)
                    return Ok(resultado);
            }
            catch (Exception ex)
            {

            }
            return BadRequest();
        }
        [HttpDelete]
        [Route("eliminar/{noticiaID}")]
        public IActionResult eliminar(int noticiaID)
        {
            try
            {
                //_noticia.NoticiaId = id;
                var resultado = _noticiaService.eliminarNoticia(noticiaID);
                //return Ok("Prueba de que todo funciona");
                //return HttpResult(200, resultado);
                if (resultado)
                    return Ok(resultado);
            }
            catch (Exception ex)
            {

            }
            return BadRequest();
        }
        
        
        


        [Route("ObtenerNoticiasPorAutor/{autorId}")]
        [HttpGet]
        public IActionResult ObtenerNoticiasPorAutor(int autorId)
        {
            return Ok(_noticiaService.ObtenerNoticiasPorAutor(autorId));
        }

    }
}