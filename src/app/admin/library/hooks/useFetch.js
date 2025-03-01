import { useQuery } from '@tanstack/react-query';

function useFetch(url) {
  const { data } = useQuery({ queryKey: url, initialData: [] });
  return data;
}

export default useFetch;
