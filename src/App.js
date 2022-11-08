/**
 * It fetches the data from the API, and then renders the data in a table
 * @returns The return statement is returning the JSX that is being rendered.
 */
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {useState, useEffect} from "react";
import {ToggleButton, ToggleButtonGroup, CircularProgress, Box} from "@mui/material";
import AttractionsIcon from '@mui/icons-material/Attractions';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import Park from "./components/disney/parks/park";
import ParkTable from "./components/ParkTable";

function App() {
    const mk = {id: 'magickingdompark', name: 'Magic Kingdom Park', shortName: 'MK'};
    const ep = {id: 'epcot', name: 'EPCOT', shortName: 'EP'};
    const hs = {id: 'disneyshollywoodstudios', name: 'Disney\'s Hollywood Studios', shortName: 'HS'};
    const ak = {id: 'disneysanimalkingdomthemepark', name: 'Disney\'s Animal Kingdom Theme Park', shortName: 'AK'};
    const [parkList] = useState([mk, ep, hs, ak]);

    const [park, setPark] = useState(mk.name);

    const handlePark = (event, park) => {
        if (park !== null) {
            setPark(park);
        }
    }

    const parkButtons = [
        <ToggleButton key={mk.id} value={mk.name}>
            <span className={'full-text'}>{mk.name}</span>
            <span className={'short-text'}>{mk.shortName}</span>
        </ToggleButton>,
        <ToggleButton key={ep.id} value={ep.name}>
            <span className={'full-text'}>{ep.name}</span>
            <span className={'short-text'}>{ep.shortName}</span>
        </ToggleButton>,
        <ToggleButton key={hs.id} value={hs.name}>
            <span className={'full-text'}>{hs.name}</span>
            <span className={'short-text'}>{hs.shortName}</span>
        </ToggleButton>,
        <ToggleButton key={ak.id} value={ak.name}>
            <span className={'full-text'}>{ak.name}</span>
            <span className={'short-text'}>{ak.shortName}</span>
        </ToggleButton>
    ];

    const [entityType, setEntityType] = useState('attraction');

    const handleEntityType = (event, newType) => {
        if (newType !== null) {
            setEntityType(newType);
        }
    }

    const entityButtons = [
        <ToggleButton key={'attractions'} value={'attraction'}>
            <span className={'full-text'}><AttractionsIcon/> Attractions</span>
            <span className={'short-text'}><AttractionsIcon/></span>
        </ToggleButton>,
        <ToggleButton key={'shows'} value={'show'}>
            <span className={'full-text'}><TheaterComedyIcon/> Shows</span>
            <span className={'short-text'}><TheaterComedyIcon/></span>
        </ToggleButton>,
        <ToggleButton key={'restaurants'} value={'restaurant'}>
            <span className={'full-text'}><RestaurantIcon/> Restaurants</span>
            <span className={'short-text'}><RestaurantIcon/></span>
        </ToggleButton>
    ];

    let initialState: [];
    initialState = [];

    const [parks, setParks] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const [timeout, setTimeout] = useState(1000);

    /* A hook that is called after every render. It is used to fetch the data from the API. */
    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(true);
            Promise.all(parkList.map(park =>
                fetch(`https://api.themeparks.wiki/v1/entity/${park.id}/live`)
                    .then((response) => response.json()))
            ).then(data => {
                setParks(initialState);
                data.forEach(park => setParks(prevState => [...prevState, new Park(park)]));
                setIsLoading(false);
                setTimeout(1000 * 60 * 5)
            })

        }, timeout);
        return () => clearInterval(interval);
    }, [initialState, parkList, timeout]);


    return (
        <div>
            <h1 align={"center"}>Walt Disney World Current Information</h1>

            <div className={'park-table'}>
                <div className={'park-selector'}>
                    <ToggleButtonGroup
                        value={park}
                        exclusive
                        onChange={handlePark}
                        orientation={'horizontal'}
                        fullWidth={true}
                        variant="text"
                    >
                        {parkButtons}
                    </ToggleButtonGroup>
                </div>
                <div className={'park-selector'}>
                    <ToggleButtonGroup
                        value={entityType}
                        exclusive
                        onChange={handleEntityType}
                        orientation={'horizontal'}
                        fullWidth={true}
                        variant="text"
                    >
                        {entityButtons}
                    </ToggleButtonGroup>
                </div>
                {isLoading ?
                    <Box display="flex"
                         justifyContent="center"
                         alignItems="center">
                        <CircularProgress sx={{marginTop: '25px'}}/>
                    </Box> : <div>
                        <ParkTable
                            entityType={entityType}
                            park={(parks.find(p => {
                                return p.name === park
                            }))}/>
                    </div>
                }

            </div>

        </div>
    )


}

export default App;