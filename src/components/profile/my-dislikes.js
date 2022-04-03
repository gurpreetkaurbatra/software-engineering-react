import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

// Component uses findAllUsersThatDislikedTuit service to retrieve the tuits disliked by "me"
// and renders them using the same tuits component
const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsDislike = () =>
        service.findAllTuitsDislikedByUser('me')
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsDislike, []);

    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsDislike}/>
        </div>
    );
};
export default MyDislikes;