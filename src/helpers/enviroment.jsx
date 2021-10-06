let APIURL = ""

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'cms-red-badge-client.herokuapp.com':
        APIURL = 'https://cms-red-badge-server.herokuapp.com';
        break;

        default:
            alert('url error');
            break;
}

export default APIURL