using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Vinlotteri.Models
{
    public class Lottery: Document
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "tickets")]
        public ICollection<Ticket> Tickets { get; set; }

        [JsonProperty(PropertyName = "prizes")]
        public Guid[] Prizes { get; set; }

        [JsonProperty(PropertyName = "completed")]
        public bool Completed { get; set; }

        [JsonProperty(PropertyName = "created")]
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
