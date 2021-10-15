using Microsoft.Azure.Cosmos;
using System;
using System.Linq;
using System.Threading.Tasks;
using Vinlotteri.Models;

namespace Vinlotteri.Services
{
    public interface ICosmosDbService
    {
        Task<ItemResponse<T>> AddItemAsync<T>(T document, string partitionKey) where T : Document;
        Task<ItemResponse<T>> DeleteItemAsync<T>(Guid id, string partitionKey);
        Task<T> GetItemAsync<T>(Guid id, string partitionKey);
        IQueryable<T> GetLinqQueryable<T>(string partitionKey);
        Task<ItemResponse<T>> UpdateItemAsync<T>(T document) where T : Document;
        IQueryable<T> GetCrossPartitionLinqQueryable<T>();
        IQueryable<T> GetCrossPartitionLinqQueryableByType<T>() where T : Document;
    }
}