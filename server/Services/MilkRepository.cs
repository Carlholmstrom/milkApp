using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services;

public class MilkRepository : IMilkRepository
{
    private readonly MilkDbContext _context;

    public MilkRepository(MilkDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Milk>> GetAll()
    {
        return await _context.Milks.ToListAsync();
    }

    public async Task<Milk> Get(string id)
    {
        return await _context.Milks.FindAsync(id);
    }


    public async Task<Milk> Update(string id, Milk milk)
    {
        _context.Entry(milk).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return milk;
    }

   

}
