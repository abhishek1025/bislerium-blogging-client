import { useState } from "react";
import { toast } from "react-toastify";
import { showNotification } from "../alerts";
import { postRequest } from "../api";
import useUserAuthContext from "./useUserAuthContext";

const useSubmitVote = (refetch) => {
    const { currentUser } = useUserAuthContext();
    const [votingStatus, setVotingStatus] = useState("");

    const submitVote =
        ({ docType, docID, newVotingStatus, docAuthorID }) =>
        async () => {
            if (!currentUser) {
                showNotification({
                    icon: "error",
                    title: "Error!",
                    message: `You must be logged in to vote the ${docType}.`,
                });
                return;
            }

            if (currentUser._id === docAuthorID) {
                showNotification({
                    icon: "error",
                    title: "Error!",
                    message: `The user cannot vote his/her own ${docType}`,
                });

                return;
            }

            if (votingStatus === newVotingStatus) {
                toast.success("You removed the like !!!");
                setVotingStatus("");
            } else {
                toast.success(`You ${newVotingStatus} the ${docType} !!!`);
                setVotingStatus(newVotingStatus);
            }

            if (docType === "question") {
                await postRequest({
                    endpoint: `/questions/${docID}/vote`,
                    data: { userID: currentUser._id, votingStatus: newVotingStatus },
                });
            }

            if (docType === "post") {
                await postRequest({
                    endpoint: `/posts/${docID}/vote`,
                    data: { userID: currentUser._id, votingStatus: newVotingStatus },
                });
            }

            if (docType === "answer") {
                await postRequest({
                    endpoint: `/answers/${docID}/vote`,
                    data: { userID: currentUser._id, votingStatus: newVotingStatus },
                });
            }

            refetch();
        };

    return { submitVote, votingStatus, setVotingStatus };
};

export default useSubmitVote;
