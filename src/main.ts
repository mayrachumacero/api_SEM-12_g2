import server from './server'
//auto ejecutable
(() => {
    server.listen(3000, () => {
        //routes
        server.get('/', (req, res) => {
            const responseObject = [];
            for (let i = 0; i < 100; i ++) {
                responseObject.push({
                    id: i,
                    name: `Product ${i}`,
                    price: Math.floor(Math.random() * 99999)
                });
            }
            res.status(200).json({msn: responseObject})
        });
        server.get('/users', (req, res) => {
            const responseObject = [];
            for (let i = 0; i < 10; i ++) {
                responseObject.push({
                    id: i,
                    name: `User ${i}`,
                    price: Math.floor(Math.random() * 99999)
                });
            }
            res.status(200).json({msn: responseObject})
        });
        server.post('/users', (req, res) => {
            console.log(req);
            const { name, username, password } = req.body;
            res.status(200).json({msn: `The user was created with the name: ${name} and the username: ${username}`})
        });
        console.log('Server is listening on port 3000');
    });
})();