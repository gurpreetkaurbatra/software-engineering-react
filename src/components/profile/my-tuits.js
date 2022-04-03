import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
    {console.log("findmytuits")
        service.findTuitByUser("me")
            .then(tuits => setTuits(tuits));
    }
    useEffect(findMyTuits, []);
    //Automatically refreshes tuits when the like button is hit
    return(
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}/>
    );
};

export default MyTuits;