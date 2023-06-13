using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIDemo.Models
{
    public class Product
    {
        //[Column("ProductId",TypeName ="int")]
        public int Id { get; set; }
        [Required(ErrorMessage = "Product name should not empty")]
        [MaxLength(100, ErrorMessage = "Product name should not more than 100")]
        public string Name { get; set; }
        [Range(1, Int32.MaxValue, ErrorMessage = "Qty should be more than 0")]
        public int Qty { get; set; }
        [Range(1, Int32.MaxValue, ErrorMessage = "Rate should be more than 0")]
        public int Rate { get; set; }
        public string Profile { get; set; }
        public bool IsActive { get; set; } = true;
        //[ForeignKey(nameof(Category.Id))]
        //[ForeignKey("category")]
        public int CatId { get; set; }
        //public Category category { get; set; }
        //[NotMapped]
        //public string FileData { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
    }
}
