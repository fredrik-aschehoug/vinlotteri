using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vinlotteri.Extensions;
using Vinlotteri.Models;
using Vinlotteri.Services;

namespace Vinlotteri.Repositories
{
    public class PlayerRepository : RepositoryBase, IPlayerRepository
    {
        public PlayerRepository(ICosmosDbService cosmosDbService) : base(cosmosDbService)
        {
        }

        public async Task<ICollection<Player>> GetAllPlayersAsync()
        {
            var results = await _cosmosDbService
                .GetCrossPartitionLinqQueryableByType<Player>()
                .ToListAsync();
            return results;
        }

        public async Task<Player> GetPlayerAsync(Guid id)
        {
            return await _cosmosDbService.GetItemAsync<Player>(id, id.ToString());
        }

        public async Task<Player> UpdatePlayerAsync(Player player)
        {
            return await _cosmosDbService.UpdateItemAsync(player);
        }

        public async Task<Player> CreatePlayerAsync(string name)
        {
            var id = Guid.NewGuid();

            var player = new Player
            {
                Id = id,
                PartitionKey = id.ToString(),
                Name = name
            };
            var result = await _cosmosDbService.AddItemAsync(player, player.PartitionKey);
            return result;
        }
    }
}
