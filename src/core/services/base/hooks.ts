import { QueryFunction, QueryKey, useQuery as useQueryPlugin, UseQueryOptions, UseQueryResult } from 'react-query'

export function useNoCacheQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  return useQueryPlugin(queryKey, queryFn, {
    ...options,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })
}
