using FBTarjeta.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FBTarjeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        private readonly TarjetaCreditoService _tarjetaCreditoService;
        public TarjetaController(TarjetaCreditoService noticiaService)
        {
            this._tarjetaCreditoService = noticiaService;
        }

  
        [HttpGet]
        [Route("porTarjetaID/{tarjetaID}")]
        public IActionResult porNoticiaID(int tarjetaID)
        {
            var resultado = _tarjetaCreditoService.porTarjetaID(tarjetaID);
            //return Ok("Prueba de que todo funciona");
            //return HttpResult(200, resultado);
            return Ok(resultado);
        }

        // GET: api/<TarjetaController>
        [HttpGet]
        public IActionResult Get()
        {
            var resultado = _tarjetaCreditoService.ObtenerTarjetas();
            return Ok(resultado);
        }

        // GET api/<TarjetaController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TarjetaController>
        [HttpPost]
        public IActionResult Post([FromBody] TarjetaCredito _tarjeta)
        {
            try
            {
                var resultado = _tarjetaCreditoService.agregarTarjeta(_tarjeta);
                if (resultado)
                    return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TarjetaCredito _tarjeta)
        {
            try
            {
                if (id != _tarjeta.Id)
                {
                    return NotFound();
                }
                var resultado = _tarjetaCreditoService.editarTarjetaCredito(id, _tarjeta);

                if (resultado)
                    return Ok(new { message = "La tarjeta fue creada de forma exitosa"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }

        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var resultado = _tarjetaCreditoService.eliminarTarjeta(id);
                if (resultado)
                {
                    return Ok(new { message = "La tarjeta fue eliminada de forma satisfactoria" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest();
        }
    }
}
