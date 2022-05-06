import { createConnection } from 'node:net';

const socket1 = createConnection(5000);

socket1.on('connect', () => {
    console.log("connected");
    socket1.write(Buffer.from(`ceev 0.1\nset-name:Noman`));
})
