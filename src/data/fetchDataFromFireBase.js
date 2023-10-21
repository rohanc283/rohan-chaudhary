import { useQuery } from '@tanstack/react-query'

export const baseUrl = "https://my-portfolio-a26f0-default-rtdb.firebaseio.com/";

export const responseStatus = {
  pending: 'Pending...',
  loading: 'Loading...',
  error: 'An error has occurred: ',
  success: 'Success',
  noData: "No data received "
}

const FetchDataFromFireBase = (endPoint, queryKey) => {

  let url = baseUrl + endPoint;
  let message = 'Processing request';

  const { isPending, isLoading, error, data, isSuccess } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      fetch(url).then(
        (res) => res.json(),
      ),
  })

  if (isPending) message = responseStatus.pending;

  if (isLoading) message = responseStatus.loading;

  if (error) message = responseStatus.error + error.message;

  if (isSuccess) {
    message = data ? responseStatus.success : responseStatus.noData;
  };

  return {
    message, data
  }

}

export default FetchDataFromFireBase

