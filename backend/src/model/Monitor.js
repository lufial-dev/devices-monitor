const M = require('ping-monitor');
const axios = require('axios');

class Monitor{
    
    constructor({radio, startMonitoring, setAltered, setMultipleAltered, getMultipleAltered}){
        this.monitor = new M({
            address : radio.ipAddress,
            port : 80,
            title: 'Raging Flame',
            interval: 1 // minutes
        });
        this.startMonitoring = startMonitoring;
        this.monitores = [];
        this.radio = radio;
        this.setAltered = setAltered;
        this.sendMensage = false;
        this.getMultipleAltered = getMultipleAltered;
        this.setMultipleAltered = setMultipleAltered;


        this.monitor.on('up', () => {
            // console.log(`${radio.name} está UP`);
            this.alterRadio(true);
        });
        
        
        this.monitor.on('down', () => {
            // console.log(`${radio.name} está DOWN`);
            this.alterRadio(false);
        });

        this.monitor.on('error', () => {
            // console.log(`${radio.name} está DOWN`);
            this.alterRadio(false);
        });

        
    }

    restart(getMultipleAltered, setMultipleAltered, startMonitoring){
        if(!getMultipleAltered()){
            setMultipleAltered();
            setTimeout(()=>{
                startMonitoring();
            }, 90000)
        }
    }
    

    alterRadio(status){
        let radio = this.radio;
        let monitores = this.monitores;
        let setAltered = this.setAltered;
        let restart = this.restart;
        let getMultipleAltered = this.getMultipleAltered;
        let setMultipleAltered = this.setMultipleAltered;
        let startMonitoring = this.startMonitoring;

      
        if(((radio.status === "UP" && !status) || (radio.status === "DOWN" && status))){
        
            monitores.map(monitor=>{
                monitor.monitor.stop();
            })

            let body = radio.status === "UP" ? { status : "DOWN" } : { status : "UP"}     
                radio.update(body)
                    .then(response => {

                        console.log(`STATUS DE ${radio.name} ALTERADO PARA ${body.status}`);

                        axios.get(`https://api.telegram.org/bot5316953414:AAGmCiwDYwVsy5BOPVDjFNOusKbl8pe8Lbw/sendMessage?chat_id=-725917814&text=${radio.name} esta ${body.status}`)
                        .then(()=>{
                            console.log("MENDAGEM ENVIADA");
                            setAltered(true);
                            restart(getMultipleAltered, setMultipleAltered, startMonitoring);
                        })
                        .catch(()=>{
                            console.log("ERRO AO ENVIAR MENSAGEM");
                                restart(getMultipleAltered, setMultipleAltered, startMonitoring);
                        })
                            
                    })

                
                
            }
        

        }

       
    }



module.exports = Monitor;



