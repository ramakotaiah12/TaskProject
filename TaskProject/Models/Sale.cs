using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskProject.Models
{
    public class Sale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int saleId { get; set; }

        public int productId { get; set; }  
        public Product Product { get; set; }

        public int customerId { get; set; }
        public Customer Customer { get; set; }

        public int storeId { get; set; }
        public Store Store { get; set; }

        public DateTime dateSold { get; set; } 


    }
}
