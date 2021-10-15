using Microsoft.Azure.Cosmos.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vinlotteri.Extensions
{
    public static class QueryableExtensions
    {
        public static async Task<ICollection<T>> ToListAsync<T>(this IQueryable<T> queryable)
        {
            var list = new List<T>();
            var setIterator = queryable.ToFeedIterator();

            while (setIterator.HasMoreResults)
            {
                foreach (var item in await setIterator.ReadNextAsync())
                {
                    list.Add(item);
                }
            }

            return list;
        }
    }
}
