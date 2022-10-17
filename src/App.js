import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import WaitTimes from "./components/WaitTimes";
import {useState} from "react";
import {ToggleButton, ToggleButtonGroup, useMediaQuery} from "@mui/material";

function App() {

    const mk = {id: 'magickingdompark', name: 'Magic Kingdom', shortName: 'MK'};
    const ep = {id: 'epcot', name: 'EPCOT', shortName: 'EP'};
    const hs = {id: 'disneyshollywoodstudios', name: 'Disney\'s Hollywood Studios', shortName: 'HS'};
    const ak = {id: 'disneysanimalkingdomthemepark', name: 'Disney\'s Animal Kingdom Theme Park', shortName: 'AK'};

    const [park, setPark] = useState({id: 'magickingdompark', name: 'Magic Kingdom'});
    const matches = useMediaQuery("(min-width:1000px)");

    const handlePark = (event, newPark) => {
        setPark(newPark);
    }

    const buttons = [
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

    return (
        <div>
            <h1 align={"center"}>Current {park.name} Wait Times</h1>

            <div className={'container'}>
                <div className={'park-selector'}>
                    <ToggleButtonGroup
                        value={park}
                        exclusive
                        onChange={handlePark}
                        orientation={matches ? 'vertical' : 'horizontal'}
                        fullWidth={true}
                        variant="text"
                    >
                        {buttons}
                    </ToggleButtonGroup>
                </div>
                <WaitTimes id={park.id} name={park.name}/>
            </div>

        </div>
    )
}

export default App;
