import React from 'react';

export const useQuery = <K>(
  request: () => Promise<ApiResponse<K>>,
  deps: React.DependencyList = []
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<K | null>(null);

  React.useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await request();
        
        if (!isCancelled) {
          if (response.success) {
            // ApiSuccessResponse - берем data
            setData(response.data);
          } else {
            // ApiFailureResponse - берем message из data.message
            setError(response.data.message);
          }
          setIsLoading(false);
        }
      } catch (e) {
        if (!isCancelled) {
          setIsLoading(false);
          setError((e as Error).message);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, ...deps]);

  return { data, error, isLoading };
};