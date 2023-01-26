using server.Models;

public interface IMilkRepository
{
    Task<IEnumerable<Milk>> GetAll();
    Task<Milk> Get(string id);
    Task<Milk> Update(string id, Milk milk);
}
