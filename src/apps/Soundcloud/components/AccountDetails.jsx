import FollowerCount from "./FollowerCount";
import Likes from "./Likes";

const AccountDetails = ({tracks}) => {

    return (
        <>
            <FollowerCount tracks={tracks} />
            <Likes />
        </>
    )
}

export default AccountDetails;