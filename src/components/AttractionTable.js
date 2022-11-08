/**
 * It takes in an array of attractions, sorts them alphabetically, and then displays them in a table
 * @param props - The props that are passed to the component.
 * @returns A table of attractions with their wait times.
 */
import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function AttractionTable(props){
    /**
     * It takes an icon, text, and color, and returns a Chip component with the icon and text inside
     * @param icon - The icon you want to display.
     * @param text - The text to display in the chip
     * @param [color=default] - The color of the chip.
     * @returns A Chip component with a label that contains a div with a display of flex, alignItems of
     * center, and a span with a class of full-text and a span.
     */
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

    /**
     * If the attraction is closed, display a red "Closed" chip. If the attraction is down, display a
     * yellow "Down" chip. If the attraction is open, display a green "Open" chip. If the attraction is
     * open and has a standby wait time, display the wait time. If the attraction is open and has a
     * boarding group, display the boarding group range
     * @param attraction - The attraction object
     * @returns A Chip component with a label of the wait time.
     */
    function displayWaitInfo(attraction) {
        let waitInfo = attraction.status;
        if (!(attraction.status === 'OPERATING')) {
            if (waitInfo === 'CLOSED') {
                return displayIconInChip(<CloseIcon/>, 'Closed', 'error');
            }
            if (waitInfo === 'DOWN') {
                return displayIconInChip(<ArrowDownwardIcon/>, 'Down', 'warning');
            }
        } else if (attraction.queue.STANDBY) {
            if (attraction.queue.STANDBY.waitTime != null) {
                waitInfo = attraction.queue.STANDBY.waitTime;
            }
        } else if (attraction.queue.BOARDING_GROUP) {
            if (attraction.queue.BOARDING_GROUP.currentGroupStart || attraction.queue.BOARDING_GROUP.currentGroupEnd) {
                waitInfo = attraction.queue.BOARDING_GROUP.currentGroupStart + '-' + attraction.queue.BOARDING_GROUP.currentGroupEnd;
            } else {
                return displayIconInChip(<CloseIcon/>, 'Closed', 'error');
            }
        }
        if (waitInfo === 'OPERATING') {
            return displayIconInChip(<EventAvailableIcon/>, 'Open', 'primary');
        }
        return <Chip color={'primary'} label={waitInfo}/>;
    }


    /**
     * It takes an attraction object as an argument, and returns a table row with the attraction name
     * and wait time
     * @param attraction - The attraction object that is being displayed.
     * @returns A table row with the attraction name and wait time.
     */
    function displayAttraction(attraction) {
        return (
            <TableRow key={attraction.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align={'left'}><h3>{attraction.name}</h3></TableCell>
                <TableCell align={'center'}>{displayWaitInfo(attraction)}</TableCell>
            </TableRow>
        );
    }
    return (
        <div className="park-table">
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {props.attractions.sort((a, b) => a.name > b.name ? 1 : -1).map((attraction) => {
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
export default AttractionTable;