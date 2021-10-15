using Newtonsoft.Json;
using System;

namespace Vinlotteri.Models
{
    public class Document
    {
        [JsonProperty(PropertyName = "partitionKey")]
        public string PartitionKey { get; set; } = Guid.NewGuid().ToString();

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }
    }
}
