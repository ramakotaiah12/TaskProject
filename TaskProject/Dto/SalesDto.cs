using System;
using TaskProject.Models;

namespace TaskProject.Dto
{
    public class SalesDto
    {
        public int Id { get; set; }

        public string Product { get; set; }

        public string Customer { get; set; }

        public string Store { get; set; }

        public DateTime dateSold { get; set; }
        
    }
}
