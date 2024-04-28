import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../api";
import useUserAuthContext from "./useUserAuthContext";

const useCheckVotingStatus = ({ endpoint, setVotingStatus }) => {
    const { currentUser } = useUserAuthContext();
    return useQuery({
        queryKey: ["VotingStatus", endpoint],
        queryFn: async () => {
            const res = await getRequest({
                endpoint,
            });

            if (res.data) {
                setVotingStatus(res?.data?.votingStatus);
            }
            return res?.data;
        },
        enabled: !!currentUser,
    });
};

export default useCheckVotingStatus;
