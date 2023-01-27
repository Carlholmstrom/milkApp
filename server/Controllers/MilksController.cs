using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MilksController : ControllerBase
    {
        private readonly IMilkRepository _milkRepository;

        public MilksController(IMilkRepository milkRepository)
        {
            _milkRepository = milkRepository;
        }

        // GET: api/Milks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Milk>>> GetMilks()
        {
            var milks = await _milkRepository.GetAll();
            return Ok(milks);
        }


        // GET: api/Milks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Milk>> GetMilk(string id)
        {
            var milk = await _milkRepository.Get(id);
            if (milk == null)
            {
                return NotFound();
            }
            return milk;
        }

        // PUT: api/Milks/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Milk>> PutMilk(string id, [FromBody] Milk milk)
        {
            var result = await _milkRepository.Update(id, milk);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


    }
}

