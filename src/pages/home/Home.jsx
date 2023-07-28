import "./home.css"

import Topbar from "../../components/topbar/Topbar"
import Feed from "../../components/feed/Feed"
export default function Home(){
    return (
        <div>
            <Topbar/>
            <div className="homeContainer">
                <Feed/>
            </div>
           

        </div>
    )
}