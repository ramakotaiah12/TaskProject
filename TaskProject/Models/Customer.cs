using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskProject.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int customerId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [Display(Name = "Name")]
        [MaxLength(100, ErrorMessage = "Name cannot be more than 100 characters")]
        public string customerName { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [Display(Name = "Address")]
        [MaxLength(100, ErrorMessage = "Address cannot be more than 100 characters")]
        public string customerAddress { get; set; }

        public ICollection<Sale> sales { get; set; }
    }
}
