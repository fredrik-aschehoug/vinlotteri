using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Vinlotteri.Models;
using Vinlotteri.Repositories;

namespace Vinlotteri.Controllers
{
    public class LotteryController: ApiController
    {
        private readonly ILotteryRepository _repository;

        public LotteryController(ILotteryRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAllLotteriesAsync();
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _repository.GetLotteryAsync(id);

            if (result == null) return NotFound();

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Lottery lottery)
        {
            var result = await _repository.UpdateLotteryAsync(lottery);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create()
        {
            var result = await _repository.CreateLotteryAsync();
            return Ok(result);

        }
    }
}
