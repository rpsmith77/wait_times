import {useEffect, useState} from "react";
import './WaitTimes.css'

import Park from './disney/parks/park';

function WaitTimes(props) {

    const [park, setPark] = useState([]);

    useEffect(() => {
        fetch(`https://api.themeparks.wiki/v1/entity/${props.id}/live`)
            .then((response) => response.json())
            .then((body) => {
                setPark(new Park(body));
            });
    }, []);

    function displayWaitInfo(attraction) {
        let waitInfo = null;
        if (!(attraction.status === 'OPERATING')) {
            waitInfo = attraction.status;
        } else if (attraction.queue.STANDBY) {
            if (attraction.queue.STANDBY.waitTime != null) {
                waitInfo = attraction.queue.STANDBY.waitTime;
            } else {
                waitInfo = '-';
            }
        } else if (attraction.queue.BOARDING_GROUP) {
            waitInfo = attraction.queue.BOARDING_GROUP.currentGroupStart + '-' + attraction.queue.BOARDING_GROUP.currentGroupEnd;
        }
        if (waitInfo === null) {
            waitInfo = '-';
        }
        return waitInfo;
    }


    function displayAttraction(attraction) {
        return (
            <tr key={attraction.id}>
                <td>{attraction.name}</td>
                <td>{displayWaitInfo(attraction)}</td>
            </tr>
        );
    }

    return (
        <div className="posts-container">
            <h1 align={"center"}>{props.name}</h1>
            <table>
                <tbody>
                {park._attractions?.sort((a, b) => a.name > b.name ? 1 : -1).map((attraction) => {
                        if (!(JSON.stringify(attraction.queue) === '{}')) {
                            return (
                                displayAttraction(attraction)
                            );
                        }
                        return null;

                    }
                )}
                </tbody>
            </table>
        </div>
    );
}

export default WaitTimes;