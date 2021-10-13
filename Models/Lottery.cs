using System;

namespace Vinlotteri.Models
{
    public class Lottery
    {
        public Guid Id { get; set; }
        public Ticket[] Tickets { get; set; }
        public Guid[] Prizes { get; set; }
        public Guid Completed { get; set; }
    }
}
