/**
 * It takes a list of restaurants and displays them in a table
 * @param props - The props passed to the component.
 * @returns A table of restaurants
 */
import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventBusyIcon from '@mui/icons-material/EventBusy';

function RestaurantTable(props) {
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
     * If the restaurant is closed, display a red "Closed" chip. If the restaurant is down, display a
     * yellow "Down" chip. If the restaurant is operating, but there are no walkups, display a yellow
     * "No Walkups" chip. Otherwise, display a green chip with the wait time
     * @param restaurant - the restaurant object
     * @returns A React component that displays a chip with the wait time of the restaurant.
     */
    function displayInfo(restaurant) {
        let waitInfo = restaurant.status;
        if (!(restaurant.status === 'OPERATING')) {
            if (waitInfo === 'CLOSED') {
                return displayIconInChip(<CloseIcon/>, 'Closed', 'error');
            }
            if (waitInfo === 'DOWN') {
                return displayIconInChip(<ArrowDownwardIcon/>, 'Down', 'warning');
            }
        } else if (restaurant.queue.STANDBY) {
            if (restaurant.queue.STANDBY.waitTime != null) {
                waitInfo = restaurant.queue.STANDBY.waitTime;
            }
        }
        if (waitInfo === 'OPERATING') {
            return displayIconInChip(<EventBusyIcon/>, 'No Walkups', 'warning');
        }
        return <Chip color={'primary'} label={waitInfo}/>;
    }


    /**
     * It takes a restaurant object as an argument and returns a table row with the restaurant's name
     * and a table cell with the restaurant's information
     * @param restaurant - The restaurant object that is being displayed.
     * @returns A table row with two table cells.
     */
    function displayRestaurant(restaurant) {
        return (
            <TableRow key={restaurant.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align={'left'}><h3>{restaurant.name}</h3></TableCell>
                <TableCell align={'center'}>{displayInfo(restaurant)}</TableCell>
            </TableRow>
        );
    }

    return (
        <div className="park-table">
            <TableContainer component={Paper}>
                <Table>

                    <TableBody>
                        {props.restaurants
                            .sort((a, b) => a.name > b.name ? 1 : -1)
                            .map((restaurant) => displayRestaurant(restaurant))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RestaurantTable;