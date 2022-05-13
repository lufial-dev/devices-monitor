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

    restart(){
        if(!this.getMultipleAltered()){
            this.setMultipleAltered();
            setTimeout(()=>{
                this.startMonitoring();
            }, 90000)
        }
    }
    

    alterRadio(status){
        if((this.radio.status === "UP" && !status) || (this.radio.status === "DOWN" && status)){
            
            this.monitores.map(monitor=>{
                monitor.monitor.stop();
            })

            let body = this.radio.status === "UP" ? { status : "DOWN" } : { status : "UP"}     
                this.radio.update(body)
                    .then(response => {

                        console.log(`STATUS DE ${this.radio.name} ALTERADO PARA ${body.status}`);

                        axios.get(`https://api.telegram.org/bot5316953414:AAGmCiwDYwVsy5BOPVDjFNOusKbl8pe8Lbw/sendMessage?chat_id=-725917814&text=${this.radio.name} esta ${body.status}`)
                        .then(()=>{
                            console.log("MENDAGEM ENVIADA");
                            this.setAltered(true);
                            this.restart();
                        })
                        .catch(()=>{
                            console.log("ERRO AO ENVIAR MENSAGEM");
                                this.restart();
                        })
                            
                    })

                
                
            }

        }

       
    }



module.exports = Monitor;



