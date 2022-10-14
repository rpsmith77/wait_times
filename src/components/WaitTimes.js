import {useEffect, useState} from "react";
import './WaitTimes.css'

import Park from './disney/parks/park';

function WaitTimes(props) {

    const [park, setPark] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themeparks.wiki/v1/entity/${props.id}/live`)
            .then((response) => response.json())
            .then((body) => {
                setPark(new Park(body));
                setIsLoading(false);
            });
    }, [props.id]);

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
            <tr className={'sep-line'} key={attraction.id}>
                <td>{attraction.name}</td>
                <td style={{textAlign: 'center'}} width={'5%'}>{displayWaitInfo(attraction)}</td>
            </tr>
        );
    }

    if (isLoading) {
        return <div className="park-table">
            <h1 style={{"textAlign":"center"}}>Loading...</h1>
        </div>
    }
    return (
        <div className="park-table">
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