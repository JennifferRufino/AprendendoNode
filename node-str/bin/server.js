const app = require("../src/app");
const http = require("http");
const debug = require("debug")("balta:server");

const port = normalizaPorta(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on("listening", onListening);

console.log("API rodando na portaa" + port);

function normalizaPorta(valor){
    const port = parseInt(valor, 10);

    if(isNaN(port)){
        return valor;
    }
    if(port >= 0) {
        return port;
    }
    return false;
}

function onError(error){

    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port;

    switch(error.code){
        case 'EACCES': {
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        }
        case 'EADDRINUSE':{
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        }
        default:
            throw console.error();
            ;
    }

}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug("Listening on" + bind);
}