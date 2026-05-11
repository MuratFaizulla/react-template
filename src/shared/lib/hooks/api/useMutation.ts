import React from 'react';

export const useMutation = <TVariables, TData>(
  request: (variables: TVariables) => Promise<ApiResponse<TData>>
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<TData | null>(null);

  const mutationAsync = React.useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError('');

      try {
        const response = await request(variables);

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
    },
    [request]
  );

  const reset = React.useCallback(() => {
    setData(null);
    setError('');
    setIsLoading(false);
  }, []);

  return { mutationAsync, data, error, isLoading, reset };
};
