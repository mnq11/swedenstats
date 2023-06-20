import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.post('/stats', async (req, res) => {
    const { Region, Civilstand, Alder, Kon, Tid } = req.body;
    // console.log("The client request : ", Region , Civilstand , Alder , Kon , Tid);
    const query = {
        "query": [
            {
                "code": "Region",
                "selection": {
                    "filter": "vs:RegionKommun07",
                    "values": Region
                }
            },
            {
                "code": "Civilstand",
                "selection": {
                    "filter": "item",
                    "values": Civilstand
                }
            },
            {
                "code": "Alder",
                "selection": {
                    "filter": "vs:Ålder1årA",
                    "values": Alder
                }
            },
            {
                "code": "Kon",
                "selection": {
                    "filter": "item",
                    "values": Kon
                }
            },
            {
                "code": "ContentsCode",
                "selection": {
                    "filter": "item",
                    "values": [
                        "BE0101N1"
                    ]
                }
            },
            {
                "code": "Tid",
                "selection": {
                    "filter": "item",
                    "values": Tid
                }
            }
        ],
        "response": {
            "format": "json"
        }
    };
    const response = await fetch('https://api.scb.se/OV0104/v1/doris/en/ssd/START/BE/BE0101/BE0101A/BefolkningNy', {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
            "Content-Type": "application/json"
        },
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response status text: ${response.statusText}`);

    if (!response.ok) {
        const text = await response.text();
        console.log(`Error from server: ${text}`);
        res.status(response.status).send(text);
    } else {
        const data = await response.json();
        // console.log('Data from API:', data);
        res.send(data);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

