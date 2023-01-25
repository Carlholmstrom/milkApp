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
        private readonly MilkDbContext _context;

        public MilksController(MilkDbContext context)
        {
            _context = context;
        }

        // GET: api/Milks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Milk>>> GetMilks()
        {
            if (_context.Milks == null)
            {
                return NotFound();
            }
            return await _context.Milks.ToListAsync();
        }

        // GET: api/Milks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Milk>> GetMilk(string id)
        {
            if (_context.Milks == null)
            {
                return NotFound();
            }
            var milk = await _context.Milks.FindAsync(id);

            if (milk == null)
            {
                return NotFound();
            }

            return milk;
        }

        // PUT: api/Milks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Milk>> PutMilk(string id, [FromBody] Milk milk)
        {
            if (id != milk.Id)
            {
                return NotFound();
            }

            _context.Entry(milk).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(milk);
        }


        // POST: api/Milks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*    [HttpPost]
           public async Task<ActionResult<Milk>> PostMilk(Milk milk)
           {
             if (_context.Milks == null)
             {
                 return Problem("Entity set 'MilkDbContext.Milks'  is null.");
             }
               _context.Milks.Add(milk);
               try
               {
                   await _context.SaveChangesAsync();
               }
               catch (DbUpdateException)
               {
                   if (MilkExists(milk.Id))
                   {
                       return Conflict();
                   }
                   else
                   {
                       throw;
                   }
               }

               return CreatedAtAction("GetMilk", new { id = milk.Id }, milk);
           } */

        // DELETE: api/Milks/5
        /*   [HttpDelete("{id}")]
          public async Task<IActionResult> DeleteMilk(string id)
          {
              if (_context.Milks == null)
              {
                  return NotFound();
              }
              var milk = await _context.Milks.FindAsync(id);
              if (milk == null)
              {
                  return NotFound();
              }

              _context.Milks.Remove(milk);
              await _context.SaveChangesAsync();

              return NoContent();
          } */

        private bool MilkExists(string id)
        {
            return (_context.Milks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
