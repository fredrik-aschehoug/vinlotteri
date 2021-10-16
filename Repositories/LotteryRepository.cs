using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vinlotteri.Extensions;
using Vinlotteri.Models;
using Vinlotteri.Services;

namespace Vinlotteri.Repositories
{
    public class LotteryRepository : RepositoryBase, ILotteryRepository
    {
        public LotteryRepository(ICosmosDbService cosmosDbService) : base(cosmosDbService)
        {
        }

        public async Task<ICollection<Lottery>> GetAllLotteriesAsync()
        {
            var results = await _cosmosDbService
                .GetCrossPartitionLinqQueryableByType<Lottery>()
                .ToListAsync();
            return results;
        }

        public async Task<Lottery> GetLotteryAsync(Guid id)
        {
            return await _cosmosDbService.GetItemAsync<Lottery>(id, id.ToString());
        }

        public async Task<Lottery> UpdateLotteryAsync(Lottery lottery)
        {
            return await _cosmosDbService.UpdateItemAsync(lottery);
        }

        public async Task<Lottery> CreateLotteryAsync(string name)
        {
            var id = Guid.NewGuid();

            var tickets = new List<Ticket>();

            for (int i = 1; i < 11; i++)
            {
                tickets.Add(new Ticket { Id = i });
            }

            var lottery = new Lottery
            {
                Id = id,
                PartitionKey = id.ToString(),
                Name = name,
                Tickets = tickets,
                Completed = false
            };
            var result = await _cosmosDbService.AddItemAsync(lottery, lottery.PartitionKey);
            return result;
        }
    }
}
