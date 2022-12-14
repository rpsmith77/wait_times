/**
 * If the entityType is attraction, show, or restaurant, then return the corresponding table.
 * Otherwise, return a loading spinner
 * @param props - The props passed to the component.
 * @returns A table of attractions, shows, or restaurants.
 */
import './WaitTimes.css'
import {CircularProgress} from '@mui/material';
import AttractionTable from "./AttractionTable";
import ShowTable from "./ShowTable";
import RestaurantTable from "./RestaurantTable";

function ParkTable(props) {

    switch (props.entityType) {
        case 'attraction':
            return <AttractionTable attractions={props.park.attractions}/>;
        case 'show':
            return <ShowTable shows={props.park.shows}/>;
        case 'restaurant':
            return <RestaurantTable restaurants={props.park.restaurants}/>;
        default:
            return <CircularProgress/>;
    }

}

export default ParkTable;