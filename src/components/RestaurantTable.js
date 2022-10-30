import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventBusyIcon from '@mui/icons-material/EventBusy';

function RestaurantTable(props){
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
                        {props.restaurants.sort((a, b) => a.name > b.name ? 1 : -1).map((restaurant) => {
                                if (!(JSON.stringify(restaurant.queue) === '{}')) {
                                    return (
                                        displayRestaurant(restaurant)
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
export default RestaurantTable;