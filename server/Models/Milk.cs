using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Milk
{
    public string? Name { get; set; }
    public string? Type { get; set; }
    public int Storage { get; set; }

    public string? Id { get; set; }
}

