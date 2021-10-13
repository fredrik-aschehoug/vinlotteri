using System;

namespace Vinlotteri.Models
{
    public class Prize
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int WinningTicket { get; set; }
    }
}
