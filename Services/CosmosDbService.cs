using Microsoft.Azure.Cosmos;
using System;
using System.Linq;
using System.Threading.Tasks;
using Vinlotteri.Models;

namespace Vinlotteri.Services
{
    public class CosmosDbService: ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            _container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task<ItemResponse<T>> AddItemAsync<T>(T document, string partitionKey) where T : Document
        {
            document.Type = typeof(T).Name;
            return await _container.CreateItemAsync<T>(document, new PartitionKey(partitionKey));
        }

        public async Task<ItemResponse<T>> DeleteItemAsync<T>(Guid id, string partitionKey) where T : Document
        {
            return await _container.DeleteItemAsync<T>(id.ToString(), new PartitionKey(partitionKey));
        }

        public async Task<T> GetItemAsync<T>(Guid id, string partitionKey) where T : Document
        {
            try
            {
                var response = await _container.ReadItemAsync<T>(id.ToString(), new PartitionKey(partitionKey));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return default;
            }

        }

        public IQueryable<T> GetLinqQueryable<T>(string partitionKey) where T : Document
        {
            return _container
               .GetItemLinqQueryable<T>(requestOptions: new QueryRequestOptions { PartitionKey = new PartitionKey(partitionKey) });
        }

        public IQueryable<T> GetLinqQueryableByType<T>(string partitionKey) where T : Document
        {
            return _container
               .GetItemLinqQueryable<T>(requestOptions: new QueryRequestOptions { PartitionKey = new PartitionKey(partitionKey) })
               .Where(doc => doc.Type == typeof(T).Name);
        }

        public IQueryable<T> GetCrossPartitionLinqQueryable<T>() where T : Document
        {
            return _container
               .GetItemLinqQueryable<T>();
        }

        public IQueryable<T> GetCrossPartitionLinqQueryableByType<T>() where T : Document
        {
            return _container
               .GetItemLinqQueryable<T>()
               .Where(doc => doc.Type == typeof(T).Name);
        }

        public async Task<ItemResponse<T>> UpdateItemAsync<T>(T document) where T : Document
        {
            return await _container.UpsertItemAsync<T>(document, new PartitionKey(document.PartitionKey));
        }
    }
}
