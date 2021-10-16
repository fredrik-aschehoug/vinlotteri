using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vinlotteri.Models;

namespace Vinlotteri.Repositories
{
    public interface IPlayerRepository
    {
        Task<Player> CreatePlayerAsync(string name);
        Task<ICollection<Player>> GetAllPlayersAsync();
        Task<Player> GetPlayerAsync(Guid id);
        Task<Player> UpdatePlayerAsync(Player player);
    }
}