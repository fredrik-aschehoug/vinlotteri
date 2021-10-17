using System;
using System.Threading.Tasks;
using Vinlotteri.Models;

namespace Vinlotteri.Services
{
    public interface ILotteryService
    {
        Task<Lottery> FinalizeLottery(Guid id);
    }
}