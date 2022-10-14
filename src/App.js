import './App.css';
import WaitTimes from "./components/WaitTimes";
import {useState} from "react";

function App() {
    const mk = {id: 'magickingdompark', name: 'Magic Kingdom'};
    const ep = {id: 'epcot', name: 'EPCOT'};
    const hs = {id: 'disneyshollywoodstudios', name: 'Disney\'s Hollywood Studios'};
    const ak = {id: 'disneysanimalkingdomthemepark', name: 'Disney\'s Animal Kingdom Theme Park'};
    const selectedColor = '#A4B8C4';

    const [park, setPark] = useState({id: 'magickingdompark', name: 'Magic Kingdom'});

    const magickKingdom = () => {
        setPark(mk);
    };

    const epcot = () => {
        setPark(ep);
    };

    const hollywoodStudios = () => {
        setPark(hs);
    };

    const animalKingdom = () => {
        setPark(ak);
    };

    return (
        <div>
            <h1 align={"center"}>Current {park.name} Wait Times</h1>

            <div className={'container'}>
                <div className={'park-selector'}>
                    <ul>
                        <li style={{backgroundColor: park.id === mk.id ? selectedColor : null}}>
                            <span className={'full-text'} onClick={magickKingdom}>Magic Kingdom</span>
                            <span className={'short-text'} onClick={magickKingdom}>MK</span>
                        </li>
                        <li style={{backgroundColor: park.id === ep.id ? selectedColor : null}}>
                            <span className={'full-text'} onClick={epcot}>EPCOT</span>
                            <span className={'short-text'} onClick={epcot}>EP</span>
                        </li>
                        <li style={{backgroundColor: park.id === hs.id ? selectedColor : null}}>
                            <span className={'full-text'} onClick={hollywoodStudios}>Hollywood Studios</span>
                            <span className={'short-text'} onClick={hollywoodStudios}>HS</span>
                        </li>
                        <li style={{backgroundColor: park.id === ak.id ? selectedColor : null}}>
                            <span className={'full-text'} onClick={animalKingdom}>Animal Kingdom</span>
                            <span className={'short-text'} onClick={animalKingdom}>AK</span>
                        </li>
                    </ul>
                </div>
                <WaitTimes id={park.id} name={park.name}/>
            </div>

        </div>
    )
}

export default App;
