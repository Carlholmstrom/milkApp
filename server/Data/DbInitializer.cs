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
        {
            var filePath = "./Data/milk.json";
            var jsonData = File.ReadAllText(filePath);
            var json = JsonConvert.DeserializeObject<MilkList>(jsonData);

            foreach (var milk in json.results)
            {
                var createMilk = new Milk
                {
                    Id = milk.Id,
                    Name = milk.Name,
                    Type = milk.Type,
                    Storage = milk.Storage
                };
                dbContext.Add(createMilk);
                dbContext.SaveChanges();
            }
        }
    }
}


