using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Vinlotteri.Models;
using Vinlotteri.Repositories;
using Vinlotteri.Services;

namespace Vinlotteri.Controllers
{
    public class LotteryController : ApiController
    {
        private readonly ILotteryRepository _repository;
        private readonly ILotteryService _service;

        public LotteryController(ILotteryRepository repository, ILotteryService service)
        {
            _repository = repository;
            _service = service;
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
        public async Task<IActionResult> Create([FromBody] Lottery lottery)
        {
            var result = await _repository.CreateLotteryAsync(lottery.Name);
            return Ok(result);

        }

        [HttpPost]
        [Route("finalize/{id}")]
        public async Task<IActionResult> Finalize(Guid id)
        {
            var result = await _service.FinalizeLottery(id);
            return Ok(result);
        }

    }
}
