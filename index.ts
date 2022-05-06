import { createServer, Server, Socket, AddressInfo } from 'node:net';

interface IConnection {
    socket: Socket | null;
    socketData: AddressInfo | {};
}

interface IConnectionList {
    [key: string]: IConnection;
}

class ConnectionCache {
    port: number = 5000; // Default Port
    socket: Socket | null = null;
    server: Server | null = null;
    connections: IConnectionList = {};

    constructor(port: number) {
        this.port = port;
        this.server = createServer((socket) => {
            this.socket = socket;
            this.socket.on('connect', () => {
                console.log("Connected");
                console.log(socket.address());
            })
            this.socket.on('data', (data) => {
                const req: string = data.toString();
                console.log(data.toString());

                const lines = req.split('\n');
                console.log(lines);

                if (lines[0] !== 'ceev 0.1') return console.error("Invalid Protocol!");
                if (lines[1].split(':')[0] !== 'set-name') return console.error("Invalid Protocol!");
                const name = lines[1].split(':')[1];
                if (this.socket) {
                    this.connections[name] = {
                        socket: this.socket,
                        socketData: this.socket?.address()
                    };
                }
            })
        });
        this.server.listen(port, () => {
            console.log(`Listening on Port: ${port}!`);
        })
        this.getConnections();
    }

    getConnections() {
        setInterval(() => {
            console.log(this.connections);
        }, 1000);
    }

    setName(name: string) {
        console.log(name);
    }

    getConnections() {

    }

    getConnection() {
        
    }

}

function createConnectionCache (PORT: number) {
    return new ConnectionCache(PORT);
}

const connectionCache = createConnectionCache(5000);