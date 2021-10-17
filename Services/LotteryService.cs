using System;
using System.Linq;
using System.Threading.Tasks;
using Vinlotteri.Models;
using Vinlotteri.Repositories;

namespace Vinlotteri.Services
{
    public class LotteryService : ILotteryService
    {
        private readonly ILotteryRepository _lotteryRepository;
        private readonly IPrizeRepository _prizeRepository;

        public LotteryService(ILotteryRepository lotteryRepository, IPrizeRepository prizeRepository)
        {
            _lotteryRepository = lotteryRepository;
            _prizeRepository = prizeRepository;
        }

        /// <summary>
        /// Draw winning tickets and set lottery to completed
        /// </summary>
        public async Task<Lottery> FinalizeLottery(Guid id)
        {
            var lottery = await _lotteryRepository.GetLotteryAsync(id);
            var prizes = await _prizeRepository.GetAllByLotteryAsync(id);

            var purchasedTickets = lottery.Tickets.Where(ticket => ticket.Owner != null);
            var winningTickets = purchasedTickets.OrderBy(x => Guid.NewGuid()).Take(prizes.Count());

            var updatedPrizes = prizes.Select((prize, i) =>
            {
                prize.WinningTicket = winningTickets.ElementAt(i).Id;
                return prize;
            });

            foreach (var prize in updatedPrizes)
            {
                await _prizeRepository.UpdatePrizeAsync(prize);
            }

            lottery.Completed = true;
            var result = await _lotteryRepository.UpdateLotteryAsync(lottery);

            return result;
        }
    }
}
