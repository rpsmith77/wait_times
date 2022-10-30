import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function ShowTable(props){
    function displayIconInChip(icon, text, color = 'default') {
        return <Chip color={color} label={
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <span className={'full-text'}>{icon}</span>
                <span>{text}</span>
            </div>
        }/>
    }

    function findNextTime(showtimes) {
        const date = new Date();
        let nextShowTime = showtimes.find(showtime =>
            date.getHours() < Number(showtime['startTime'].slice(11, 13)) ||
            (date.getHours() === Number(showtime['startTime'].slice(11, 13)) &&
            date.getMinutes() <= Number(showtime['startTime'].slice(14, 16)))
        );
        if (!nextShowTime) {
            return displayIconInChip(<CloseIcon/>, 'Concluded', 'warning');
        }
        if (nextShowTime.startTime !== nextShowTime.endTime){
            return <Chip color={'primary'} label={
                nextShowTime.startTime.slice(11,16) + "-" + nextShowTime.endTime.slice(11,16)
            }/>
        }
        return <Chip color={'primary'} label={nextShowTime.startTime.slice(11,16)}/>

    }

    function displayInfo(show) {
        let waitInfo = show.status;
        if (!(show.status === 'OPERATING')) {
            if (waitInfo === 'CLOSED') {
                return displayIconInChip(<CloseIcon/>, 'Closed', 'error');
            }
            if (waitInfo === 'DOWN') {
                return displayIconInChip(<ArrowDownwardIcon/>, 'Down', 'warning');
            }
        } else if (show.showtimes) {
            return findNextTime(show.showtimes)
        }
        if (waitInfo === 'OPERATING') {
            return displayIconInChip(<EventAvailableIcon/>, 'Open', 'primary');
        }
        return <Chip color={'primary'} label={waitInfo}/>;
    }


    function displayShow(show) {
        return (
            <TableRow key={show.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align={'left'}><h3>{show.name}</h3></TableCell>
                <TableCell align={'center'}>{displayInfo(show)}</TableCell>
            </TableRow>
        );
    }
    return (
        <div className="park-table">
            <TableContainer component={Paper}>
                <Table>

                    <TableBody>
                        {props.shows.sort((a, b) => a.name > b.name ? 1 : -1).map((show) => {
                                if (!(JSON.stringify(show.queue) === '{}')) {
                                    return (
                                        displayShow(show)
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
export default ShowTable;