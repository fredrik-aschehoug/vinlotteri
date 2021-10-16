using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Vinlotteri.Models;
using Vinlotteri.Repositories;

namespace Vinlotteri.Controllers
{
    public class PlayerController : ApiController
    {
        private readonly IPlayerRepository _repository;

        public PlayerController(IPlayerRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAllPlayersAsync();
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _repository.GetPlayerAsync(id);

            if (result == null) return NotFound();

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Player player)
        {
            var result = await _repository.UpdatePlayerAsync(player);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Player player)
        {
            var result = await _repository.CreatePlayerAsync(player.Name);
            return Ok(result);

        }
    }
}
