const express = require('express')
const app = express()
const port = 3020
// var ping = require('ping');
const cors = require("cors");
const sequelize = require('./src/services/db');
const Radio = require('./src/model/Radio');
const Monitor = require('./src/model/Monitor');
const Local = require('./src/model/Local');

app.use(express.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

var hosts = [];
var data = {}
var altered = false;
var multipleAltered = false;
var monitores  = [];

const setAltered = ()=>{
    altered = true;
}

const setMultipleAltered = ()=>{
    multipleAltered = true;
}

const getMultipleAltered = ()=>{
    return multipleAltered
}

const startMonitoring = async ()=>{
    monitores = [];
    altered = false;
    multipleAltered = false;
    await Radio.findAll()
    .then(response => {
        hosts = response;
        hosts.map(host=>{
            let monitor = new Monitor({
                radio : host,
                startMonitoring : startMonitoring,
                setAltered : setAltered,
                setMultipleAltered : setMultipleAltered,
                getMultipleAltered : getMultipleAltered
            })
            monitores.push(monitor);
        });

        monitores.map(monitor=>{
            monitor.monitores = monitores;
        })

    })
    .catch(error => {
        console.log(error)
    })
}

app.get('/', (req, res) => {
    data = {
        hosts,
        altered
    }
    return res.status(200).json(data);
});

app.get('/locais', (req, res) => {
    Local.findAll()
    .then(response=>{
        return res.status(200).json(response);
    })
    .catch(error=>{
        return res.status(500).json(error);
    })
});


app.post('/', async(req, res)=>{
    Radio.create(req.body).then((response)=>{
        monitores.map(monitor=>monitor.monitor.stop());
        startMonitoring();
        return res.status(200).json(response.data)
    }).catch(()=>{
        return res.status(500)
    })
})

app.post('/local', async(req, res)=>{
    Local.create(req.body).then((response)=>{
        return res.status(200).json(response.data)
    }).catch(()=>{
        return res.status(500)
    })
})

sequelize.sync();

startMonitoring();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})