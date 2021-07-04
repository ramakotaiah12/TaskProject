using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskProject.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int productId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [Display(Name = "Name")]
        [MaxLength(100, ErrorMessage = "Name cannot be more than 100 characters")]
        public string productName { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Display(Name = "Price ($)")]
        [Column(TypeName = "decimal(18,4)")]

        [RegularExpression(@"^\d+.\d{0,2}$", ErrorMessage = "Price can't have more than 2 decimal places")]
        public decimal productPrice { get; set; }

        public ICollection<Sale> sales { get; set; }
    }
}
