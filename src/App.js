import './App.css';

import {useState, useEffect} from "react";
import {ToggleButton, ToggleButtonGroup, CircularProgress, Box} from "@mui/material";

import Park from "./components/disney/parks/park";
import ParkTable from "./components/ParkTable";

function App() {
    const mk = {id: 'magickingdompark', name: 'Magic Kingdom Park', shortName: 'MK'};
    const ep = {id: 'epcot', name: 'EPCOT', shortName: 'EP'};
    const hs = {id: 'disneyshollywoodstudios', name: 'Disney\'s Hollywood Studios', shortName: 'HS'};
    const ak = {id: 'disneysanimalkingdomthemepark', name: 'Disney\'s Animal Kingdom Theme Park', shortName: 'AK'};
    const [parkList] = useState([mk, ep, hs, ak]);

    const [park, setPark] = useState(mk);

    const handlePark = (event, newPark) => {
        setPark(newPark);
    }

    const parkButtons = [
        <ToggleButton key={mk.id} value={mk}>
            <span className={'full-text'}>{mk.name}</span>
            <span className={'short-text'}>{mk.shortName}</span>
        </ToggleButton>,
        <ToggleButton key={ep.id} value={ep}>
            <span className={'full-text'}>{ep.name}</span>
            <span className={'short-text'}>{ep.shortName}</span>
        </ToggleButton>,
        <ToggleButton key={hs.id} value={hs}>
            <span className={'full-text'}>{hs.name}</span>
            <span className={'short-text'}>{hs.shortName}</span>
        </ToggleButton>,
        <ToggleButton key={ak.id} value={ak}>
            <span className={'full-text'}>{ak.name}</span>
            <span className={'short-text'}>{ak.shortName}</span>
        </ToggleButton>
    ];

    const [entityType, setEntityType] = useState('attraction');

    const handleEntityType = (event, newType) => {
        setEntityType(newType);
    }

    const entityButtons = [
        <ToggleButton key={'attractions'} value={'attraction'}>
            Attractions
        </ToggleButton>,
        <ToggleButton key={'shows'} value={'show'}>
            Shows
        </ToggleButton>,
        <ToggleButton key={'restaurants'} value={'restaurant'}>
            Restaurants
        </ToggleButton>
    ];

    let initialState: [];
    initialState = [];

    const [parks, setParks] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const [timeout, setTimeout] = useState(1000);

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
                setTimeout(1000 * 60)
            })

        }, timeout);
        return () => clearInterval(interval);
    }, [initialState, parkList, timeout]);


    return (
        <div>
            <h1 align={"center"}>{park.name} Information</h1>

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
                            park={(parks.find(obj => {
                                return obj.name === park.name
                            }))}/>
                    </div>}

            </div>

        </div>
    )


}

export default App;