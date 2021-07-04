using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskProject.Models
{
    public class Store
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int storeId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [Display(Name = "Name")]
        [MaxLength(100, ErrorMessage = "Name cannot be more than 100 characters")]
        public string storeName { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [Display(Name = "Address")]
        [MaxLength(100, ErrorMessage = "Address cannot be more than 100 characters")]
        public string storeAddress { get; set; }

        public ICollection<Sale> sales { get; set; }
    }
}
