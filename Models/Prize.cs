using Newtonsoft.Json;
using System;

namespace Vinlotteri.Models
{
    public class Prize: Document
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "price")]
        public int Price { get; set; }

        [JsonProperty(PropertyName = "winningTicket")]
        public int WinningTicket { get; set; }
    }
}
