using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIDemo.Models
{
    public interface IProduct
    {
        public Product GetProductById(int id);
        public Product GetProductByCatId(int id);
        public IEnumerable<Product> GetAllProduct();
        public bool AddProduct(Product p);
        public bool UpdateProduct(Product p);
        public bool Delete(int id);
        public bool CheckUpdateUnique(string name, int catId, int prodId);
        public bool CheckInsertUnique(string name, int catId);
    }
}
