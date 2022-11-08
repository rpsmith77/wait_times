import GitHubIcon from '@mui/icons-material/GitHub';
function Footer() {
    return (
        <div className={"footer"}>
                <a href={'https://github.com/rpsmith77/wait_times/blob/master/License.md'}>MIT License</a>&nbsp;|&nbsp;
                <a href={'https://github.com/rpsmith77/wait_times/'}><GitHubIcon/> GitHub</a>&nbsp;|&nbsp;
                API used : <a href={'https://themeparks.wiki/'}>themeparks.wiki</a>,&nbsp;
                {/*<a href={'https://touringplans.com/api'}>touringplans.com</a>*/}
        </div>
    );
}

export default Footer;