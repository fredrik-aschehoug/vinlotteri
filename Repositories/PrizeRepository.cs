using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vinlotteri.Extensions;
using Vinlotteri.Models;
using Vinlotteri.Services;

namespace Vinlotteri.Repositories
{
    public class PrizeRepository : RepositoryBase, IPrizeRepository
    {
        public PrizeRepository(ICosmosDbService cosmosDbService) : base(cosmosDbService)
        {
        }

        public async Task<ICollection<Prize>> GetAllByLotteryAsync(Guid lotteryId)
        {
            var result = await _cosmosDbService
                .GetLinqQueryableByType<Prize>(lotteryId.ToString())
                .OrderByDescending(prize => prize.Price)
                .ToListAsync();

            return result;
        }

        public async Task<Prize> UpdatePrizeAsync(Prize prize)
        {
            return await _cosmosDbService.UpdateItemAsync(prize);
        }

        public async Task<Prize> CreateAsync(Guid lotteryId, Prize prize)
        {
            var prizeDocument = new Prize
            {
                Id = Guid.NewGuid(),
                PartitionKey = lotteryId.ToString(),
                Name = prize.Name,
                Price = prize.Price
            };

            return await _cosmosDbService.AddItemAsync(prizeDocument, prizeDocument.PartitionKey);
        }
    }
}
