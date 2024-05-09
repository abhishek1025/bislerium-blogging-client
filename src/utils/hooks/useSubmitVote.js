import { useState } from 'react';
import { toast } from 'react-toastify';
import { showNotification } from '../alerts';
import { deleteRequest, getRequest, postRequest, putRequest } from '../api';
import useUserAuthContext from './useUserAuthContext';
import { useQuery } from '@tanstack/react-query';
import { VOTE_TYPE } from '../../constants';

const useSubmitVote = ({ blogId = '', commentId = '' }) => {
  const message = {
    [VOTE_TYPE.UP_VOTE]: 'upvote',
    [VOTE_TYPE.DOWN_VOTE]: 'downvote',
  };

  const { currentUser } = useUserAuthContext();
  const [voteId, setVoteId] = useState();
  const itemType = blogId ? 'Blog' : 'Comment';

  const [voteType, setVoteType] = useState('');

  const { data: existingVoteType } = useQuery({
    queryKey: ['Existing Vote Type', blogId ? blogId : commentId],
    queryFn: async () => {
      const endpoint = blogId
        ? `/vote/vote-type?blogId=${blogId}`
        : `/vote/vote-type?commentId=${commentId}`;

      const res = await getRequest({
        endpoint,
      });

      if (res.ok) {
        setVoteType(res.data.voteType);
        setVoteId(res.data.voteId);

        return '';
      }

      setVoteType('');

      return '';
    },
  });

  const submitVote =
    ({ voteType: newVoteType }) =>
    async () => {
      if (!currentUser) {
        showNotification({
          icon: 'error',
          title: 'Error!',
          message: `You must be logged in to vote the ${itemType}.`,
        });
        return;
      }

      if (!voteId && !voteType) {
        await postVote({ newVoteType });
      }

      if (voteId && voteType === newVoteType) {
        await deleteVote();
        return;
      }

      if (voteId && voteType !== newVoteType) {
        await updateVote({ newVoteType });
        return;
      }
    };

  const postVote = async ({ newVoteType }) => {
    showNotification({
      icon: 'success',
      title: 'Success!!',
      message: `You ${message[newVoteType]} the ${itemType} !!!`,
    });
    setVoteType(newVoteType);

    await postRequest({
      endpoint: `/vote`,
      data: {
        commentId,
        blogId,
        voteType: newVoteType,
      },
    });
  };

  const deleteVote = async () => {
    showNotification({
      icon: 'success',
      title: 'Success!!',
      message: `You removed  the vote!!!`,
    });
    setVoteType('');

    await deleteRequest({
      endpoint: `/vote/${voteId}`,
    });
  };

  const updateVote = async ({ newVoteType }) => {
    showNotification({
      icon: 'success',
      title: 'Success!!',
      message: `You ${message[newVoteType]} the ${itemType} !!!`,
    });
    setVoteType(newVoteType);

    await putRequest({
      endpoint: `/vote/vote-type/update/${voteId}?voteType=${newVoteType}`,
    });
  };

  return { submitVote, voteType, setVoteType };
};

export default useSubmitVote;

