using System;

namespace Vinlotteri.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public Guid? Owner { get; set; } = null;
    }
}