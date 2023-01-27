using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class MilkDbContext : DbContext
{
    public MilkDbContext(DbContextOptions<MilkDbContext> options)
        : base(options)
    {
    }
    public DbSet<Milk> Milks { get; set; } = null!;

}