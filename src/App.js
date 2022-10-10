import './App.css';
import WaitTimes from "./components/WaitTimes";

function App() {

    return (
        <div>
            <h1 align={"center"}>TESTING</h1>

            <div className={'container'}>
                <WaitTimes id={'magickingdompark'} name={'Magic Kingdom'}/>
                <WaitTimes id={'epcot'} name={'EPCOT'}/>
                <WaitTimes id={'disneyshollywoodstudios'} name={'Disney\'s Hollywood Studios'}/>
                <WaitTimes id={'disneysanimalkingdomthemepark'} name={'Disney\'s Animal Kingdom Theme Park'}/>
            </div>

        </div>
    )
}

export default App;
