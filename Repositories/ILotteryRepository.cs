using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vinlotteri.Models;

namespace Vinlotteri.Repositories
{
    public interface ILotteryRepository
    {
        Task<Lottery> CreateLotteryAsync();
        Task<ICollection<Lottery>> GetAllLotteriesAsync();
        Task<Lottery> GetLotteryAsync(Guid id);
        Task<Lottery> UpdateLotteryAsync(Lottery lottery);
    }
}