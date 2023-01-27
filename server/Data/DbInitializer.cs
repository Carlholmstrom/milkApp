using Newtonsoft.Json;
using server.Models;

namespace server.Data;

internal class DbInitializer
{
    internal static void Initialize(MilkDbContext dbContext)
    {
        ArgumentNullException.ThrowIfNull(dbContext, nameof(dbContext));
        dbContext.Database.EnsureCreated();
        if (dbContext.Milks.Any()) return;

        var milks = new Milk[]
        {
            new Milk{ Id = "1", Name = "Bruce Wayne", Type = "Oat milk", Storage = 54 }
        };

        foreach(var milk in milks)
            dbContext.Milks.Add(milk);

        dbContext.SaveChanges();
    }
}

