using server.Models;

namespace server.Data;

internal class DbInitializer
{
    internal static void Initialize(MilkDbContext milkDbContext)
    {
        ArgumentNullException.ThrowIfNull(milkDbContext, nameof(milkDbContext));
        milkDbContext.Database.EnsureCreated();
        if (milkDbContext.Milks.Any()) return;

        var users = new Milk[]
        {
            new Milk{ Id = "1", Name = "Anna's oat milk", Storage = 65, Type = "Oat Milk"},
            new Milk{ Id = "2", Name = "Erik's almond milk", Storage = 65, Type = "Almond Milk"},
            new Milk{ Id = "3", Name = "Mary's hemp milk", Storage = 65, Type = "Hemp Milk"}

        };

        foreach (var user in users)
            milkDbContext.Milks.Add(user);

        milkDbContext.SaveChanges();
    }
}