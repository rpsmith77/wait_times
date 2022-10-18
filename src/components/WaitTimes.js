import {useEffect, useState} from "react";
import './WaitTimes.css'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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

    function displayIconInChip(icon, text, color = 'default') {
        return <Chip color={color} label={<div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: "center",
            verticalAlign: "middle",
        }}>
            <span className={'full-text'}>{icon}</span>
            <span>{text}</span>
        </div>}/>
    }

    function displayWaitInfo(attraction) {
        let waitInfo = attraction.status;
        if (!(attraction.status === 'OPERATING')) {
            if (waitInfo === 'CLOSED') {
                return displayIconInChip(<CloseIcon/>, 'Closed');
            }
            if (waitInfo === 'DOWN') {
                return displayIconInChip(<ArrowDownwardIcon/>, 'Down', 'error');
            }
        } else if (attraction.queue.STANDBY) {
            if (attraction.queue.STANDBY.waitTime != null) {
                waitInfo = attraction.queue.STANDBY.waitTime;
            }
        } else if (attraction.queue.BOARDING_GROUP) {
            if (attraction.queue.BOARDING_GROUP.currentGroupStart || attraction.queue.BOARDING_GROUP.currentGroupEnd) {
                waitInfo = attraction.queue.BOARDING_GROUP.currentGroupStart + '-' + attraction.queue.BOARDING_GROUP.currentGroupEnd;
            } else {
                return displayIconInChip(<CloseIcon/>, 'Closed');
            }
        }
        if (waitInfo === 'OPERATING') {
            return displayIconInChip(<EventAvailableIcon/>, 'Open', 'primary');
        }
        return <Chip color={'primary'} label={waitInfo}/>;
    }


    function displayAttraction(attraction) {
        return (
            <TableRow key={attraction.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align={'left'}><h3>{attraction.name}</h3></TableCell>
                <TableCell align={'center'}>{displayWaitInfo(attraction)}</TableCell>
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