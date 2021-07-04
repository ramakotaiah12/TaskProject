using System;
using System.Collections.Generic;
using TaskProject.Models;

namespace TaskProject.Services
{
    public interface IStoreRepository
    {
        ICollection<Store> GetStores();
        Store GetStore(int storeId);
        bool StoreExists(int storeId);
        bool CreateStore(Store store);
        bool UpdateStore(Store store);
        bool DeleteStore(Store store);
        bool Save();
    }
}
