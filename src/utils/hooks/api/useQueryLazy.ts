import React from 'react';

export const useQueryLazy = <K>(
  request: () => Promise<ApiResponse<K>>
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<K | null>(null);

  const query = React.useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await request();

      if (response.success) {
        setData(response.data);
        setIsLoading(false);
        return response.data;
      } else {
        setError(response.data.message);
        setIsLoading(false);
        return null;
      }
    } catch (e) {
      setIsLoading(false);
      setError((e as Error).message);
      return null;
    }
  }, [request]);

  return { query, data, error, isLoading };
};