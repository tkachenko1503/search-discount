import Parse from 'parse';

const devPort = 8090;
const hostname = window.location.hostname;
const url = window.location.protocol + '//' + hostname;

Parse.initialize('app-id', 'js-key');
Parse.serverURL = (hostname === 'localhost' ? url + ':' + devPort : url) + '/parse';

export default Parse;
