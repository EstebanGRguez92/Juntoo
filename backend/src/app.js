const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Backend funcionando!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
