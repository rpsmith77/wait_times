import {useEffect, useState} from "react";
import './WaitTimes.css'

import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, Chip, CircularProgress, Box} from '@mui/material';

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
        let waitInfo = attraction.status;
        if (!(attraction.status === 'OPERATING')) {
            return waitInfo;
        } else if (attraction.queue.STANDBY) {
            if (attraction.queue.STANDBY.waitTime != null) {
                waitInfo = attraction.queue.STANDBY.waitTime;
            }
        } else if (attraction.queue.BOARDING_GROUP) {
            waitInfo = attraction.queue.BOARDING_GROUP.currentGroupStart + '-' + attraction.queue.BOARDING_GROUP.currentGroupEnd;
        }
        return waitInfo;
    }


    function displayAttraction(attraction) {
        return (
            <TableRow key={attraction.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align={'left'}>{attraction.name}</TableCell>
                <TableCell align={'center'}><Chip label={displayWaitInfo(attraction)}/></TableCell>
            </TableRow>
        );
    }

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <CircularProgress sx={{marginTop: '25px'}}/>
            </Box>
        );
    }

    return (
        <div className="park-table">
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {park._attractions?.sort((a, b) => a.name > b.name ? 1 : -1).map((attraction) => {
                                if (!(JSON.stringify(attraction.queue) === '{}')) {
                                    return (
                                        displayAttraction(attraction)
                                    );
                                }
                                return null;
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default WaitTimes;