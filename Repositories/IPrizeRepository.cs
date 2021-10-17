using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vinlotteri.Models;

namespace Vinlotteri.Repositories
{
    public interface IPrizeRepository
    {
        Task<ICollection<Prize>> GetAllByLotteryAsync(Guid lotteryId);
        Task<Prize> UpdatePrizeAsync(Prize prize);
        Task<Prize> CreateAsync(Guid lotteryId, Prize prize);
    }
}