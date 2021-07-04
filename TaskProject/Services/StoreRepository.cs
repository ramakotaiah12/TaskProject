using System;
using System.Collections.Generic;
using System.Linq;
using TaskProject.Models;

namespace TaskProject.Services
{
    public class StoreRepository: IStoreRepository
    {
        private TaskDbContext _storeContext;
        public StoreRepository(TaskDbContext taskDbContext)
        {
            _storeContext = taskDbContext;
        }

        public bool CreateStore(Store store)
        {
            _storeContext.Add(store);
            return Save();
        }

        public bool DeleteStore(Store store)
        {
            _storeContext.Remove(store);
            return Save();
        }

        public Store GetStore(int storeId)
        {
            return _storeContext.Stores.Where(s => s.storeId == storeId).FirstOrDefault();
        }

        public ICollection<Store> GetStores()
        {
            return _storeContext.Stores.OrderBy(s => s.storeId).ToList();
        }

        public bool Save()
        {
            var saved = _storeContext.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public bool UpdateStore(Store store)
        {
            _storeContext.Update(store);
            return Save();
        }

        public bool StoreExists(int storeId)
        {
            return _storeContext.Stores.Any(s => s.storeId == storeId);
        }
    }
}
