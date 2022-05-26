using Business.Abstract;
using Core.DataAccess.Dapper;
using Core.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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


        [HttpGet("getlist")]
        public IActionResult GetList(int id)
        {

            QueryParameter parameter2 = new QueryParameter();
            parameter2.FilterList.Filter("ID", id);

            var result = _brandService.GetList(parameter2);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result.InfoMessage);
        }


        [HttpGet("getbyid")]
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
