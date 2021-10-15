using Vinlotteri.Services;

namespace Vinlotteri.Repositories
{
    public abstract class RepositoryBase
    {
        protected readonly ICosmosDbService _cosmosDbService;

        protected RepositoryBase(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }
    }
}
