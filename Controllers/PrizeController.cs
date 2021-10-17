using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Vinlotteri.Models;
using Vinlotteri.Repositories;

namespace Vinlotteri.Controllers
{
    [Route("api/lottery/{lotteryId}/[controller]")]
    public class PrizeController : ApiController
    {
        private readonly IPrizeRepository _repository;

        public PrizeController(IPrizeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllByLottery(Guid lotteryId)
        {
            var result = await _repository.GetAllByLotteryAsync(lotteryId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Guid lotteryId, [FromBody] Prize prize)
        {
            var result = await _repository.CreateAsync(lotteryId, prize);
            return Ok(result);
        }
    }
}
