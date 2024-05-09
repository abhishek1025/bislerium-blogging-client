import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../api';

const useBlogDetails = blogID => {
  return useQuery({
    queryKey: ['Blog', blogID], // Use blogID to create a unique cache key for each blog.
    queryFn: async () => {
      const response = await getRequest({
        endpoint: `/blog/${blogID}`,
      });
      return response.data;
    },
  });
};

export default useBlogDetails;

