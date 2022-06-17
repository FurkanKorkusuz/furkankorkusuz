using Business.Abstract;
using Core.DataAccess.Dapper;
using Core.Entities.DTOs;
using Core.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private IBrandService _brandService;
        public BrandsController(IBrandService brandService)
        {
            _brandService = brandService;
        }


        //[EnableCors("MyPolicy")]
        [HttpPost("GetList")]
        //  [Authorize]
        public IActionResult GetList(QueryParameter queryParameter)
        {
            var result = _brandService.GetList(queryParameter);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result.InfoMessage);
        }


        [HttpPost("getbyid")]
        // [Authorize(Roles ="Brand.Get")]
        public IActionResult GetByPattern(int id)
        {
            var result = _brandService.GetByPattern(new {ID=id});
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result.InfoMessage);
        }
    }
}
