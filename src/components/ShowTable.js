/**
 * It takes in a list of shows, sorts them by name, then sorts them by status, then maps over them and
 * displays them in a table
 * @param props - The props that are passed to the component.
 * @returns A table of shows with their name and status.
 */
import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function ShowTable(props) {
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
     * It takes in an array of showtimes and returns a chip with the next showtime
     * @param showtimes - The showtimes of the movie
     * @returns A React component.
     */
    function findNextTime(showtimes) {
        const date = new Date();
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
        let nextShowTime = showtimes.find(showtime =>
            date.getHours() < Number(showtime['startTime'].slice(11, 13)) - 4 ||  // - 4 for Timezone offset
            (date.getHours() <= Number(showtime['endTime'].slice(11, 13)) - 4 &&
                date.getMinutes() <= Number(showtime['endTime'].slice(14, 16)))
        );
        if (!nextShowTime) {
            return displayIconInChip(<CloseIcon/>, 'Concluded', 'warning');
        }
        if (nextShowTime.startTime !== nextShowTime.endTime) {
            return <Chip color={'primary'} label={
                nextShowTime.startTime.slice(11, 16) + "-" + nextShowTime.endTime.slice(11, 16)
            }/>
        }
        return <Chip color={'primary'} label={nextShowTime.startTime.slice(11, 16)}/>
    }

    /**
     * It takes in a show object, and returns a Chip component with a color and label based on the
     * show's status
     * @param show - The show object
     * @returns A function that returns a Chip component.
     */
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


    /**
     * It returns a table row with two cells, the first cell containing the show's name, and the second
     * cell containing the show's information
     * @param show - The show object that is being displayed.
     * @returns A table row with two table cells.
     */
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
                        {props.shows
                            .sort((a, b) => a.name > b.name ? 1 : -1)
                            .sort((a, b) => a.status > b.status ? -1 : 1)
                            .map((show) => displayShow(show))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ShowTable;