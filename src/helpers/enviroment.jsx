let APIURL = ""

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'cms-red-badge-client.herokuapp.com'://needs to change
        APIURL = 'https://cms-red-badge-server.herokuapp.com'//needs to change
        break;

        default:
            alert('url error');
            break;
}
// did not push case two changes yet

export default APIURL