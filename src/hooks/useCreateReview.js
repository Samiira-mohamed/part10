import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';
import { GET_REPOSITORY } from '../graphql/queries';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    refetchQueries: [GET_REPOSITORY],
  });

  const createReview = async ({
    ownerName,
    repositoryName,
    rating,
    text,
  }) => {
    return await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      },
    });
  };

  return [createReview, result];
};

export default useCreateReview;
