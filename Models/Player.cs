using Newtonsoft.Json;
using System;

namespace Vinlotteri.Models
{
    public class Player: Document
    {
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
