﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIDemo.Models
{
    public class SQLCategoryRepository:ICategory
    {
        AppDbContext _categories;
        public SQLCategoryRepository(AppDbContext categories)
        {
            _categories = categories;
        }
        public bool AddCategory(Category category)
        {
            if (CheckInsertUnique(category.Name))
            {
                _categories.Add(category);
                _categories.SaveChanges();
                return true;
            }
            return false;
        }
        public bool CheckInsertUnique(string name)
        {
            Category IsDuplicate = _categories.Categories.FirstOrDefault(each => name.ToLower() == each.Name.ToLower());
            return IsDuplicate == null ? true : false;
        }
        public bool UpdateCategory(Category category)
        {
            if (CheckUpdateUnique(category.Name, category.Id))
            {
                _categories.ChangeTracker.Clear();
                _categories.Categories.Update(category);
                _categories.SaveChanges();
                return true;
            }
            return false;
        }
        public bool CheckUpdateUnique(string name, int catId)
        {
            Category category = _categories.Categories.FirstOrDefault(each => each.Name.ToLower() == name.ToLower());
            if (category == null)
                return true;
            category = _categories.Categories.FirstOrDefault(each => each.Name.ToLower() == name.ToLower() && each.Id == catId);
            if (category != null)
                return true;
            return false;
        }
        public bool Delete(int id)
        {
            Category category = _categories.Categories.FirstOrDefault(Each => Each.Id == id);
            if (category != null)
            {
                _categories.Remove(category);
                _categories.SaveChanges();
                return true;
            }
            return false;
        }
        public IEnumerable<Category> GetAllCategories()
        {
            return _categories.Categories;
        }
        public Category GetCategoryById(int id)
        {
            return _categories.Categories.SingleOrDefault(each => each.Id == id);
        }
    }
}
