var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Web3            = require('web3'),
    path            = require('path')
    GestionJSON  = require(path.join(__dirname, '../build/contracts/Gestion.json'));

var resultadoNuevo=[];
var espaciosNuevo=[];
var resultado1=["","","","","","","","","",""];
var espacios=[0,0,0,0,0,0,0,0,0,0];
var comparacion=["","","","","","","","","",""];

var contadorNuevo=0;

var contador=0;
const contractAddress = "0x586f02AF0f59867CC3D73B663a718Af9468d2142";

if(typeof web3 !== 'undefined'){
	web3 = new Web3(web3.currentProvider);
}
else{
  web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
}

web3.eth.getAccounts((err,accounts)=> {
	if (err) return
		web3.eth.defaultAccount = accounts[0];
}); // used to define the default account. this account will pay for the transactions



var gestionContract = new web3.eth.Contract(GestionJSON.abi, contractAddress, { gas: 4000000 });


/*************************RESULT CALLED BY AN EVENT *************************/


gestionContract.events.customEventResult({fromBlock:null}, (error, event) => { console.log(event); }).on('data',(event) => {

  console.log(event);
    console.log('Received result event! - ');
    var partes=event.returnValues.mysqlresult.split("--", 3);
    callMyResult(partes);
    console.log(partes);
});

function callMyResult(array){
	if(array[2]==1){
	gestionContract.methods.compareHashes(array[1]).send({ from : web3.eth.defaultAccount, gas:300000}).then((result, error) => {
		console.log("***callMyResult*** HASSHES COMPARADOS");
		gestionContract.methods.getBoolComparation(array[1]).call({ from : web3.eth.defaultAccount, gas:300000}).then((result, error) => {
			console.log("***callMyResult*** El resultado de la comparacion es: " + result);
			comparacion[array[1]-1]=result; //save the result of the comparation in the server

		});
	});
	resultado1[array[1]-1]=array[0];
  			console.log("Resultado1: "+resultado1);
  			  			console.log("Resultado1:pos "+resultado1[array[1]-1]);
  			console.log("Array0: "+array[0]);
	}else{

  			resultadoNuevo[array[1]]=array[0]; //save the response of the DDBB in the server
  			console.log(resultadoNuevo);
  			console.log(array[0]);
  	}
 // 		}else{
 //     		console.error(error);
 //   	}
 //	});
}


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web App for Smart Contract' });
});

router.get('/sendRequestInsert', function(req, res, next) {
	contadorNuevo++;
	identificador=-1;
	for( var i=0; i<espaciosNuevo.length; i++){
		if(espaciosNuevo[i]==0){
			espaciosNuevo[i]=1;
			identificador=i;
		}else{}
	}
	if(identificador==-1){
		espaciosNuevo.push(espaciosNuevo.length);
		espaciosNuevo[espaciosNuevo.length-1]=1;
		identificador=espaciosNuevo.length-1;
		resultadoNuevo.push("");
	}else{}
		id=identificador;
		var obj = {};
		obj=[];
		var request = req.query.request; 
	  	var request1 = req.query.request1;
	  	var request2 = req.query.request2;
	  	var request3 = req.query.request3;
	  	var request4 = req.query.request4;
	  	var request5 = req.query.request5;
	  	var request6 = req.query.request6;
	  	var request7 = req.query.request7;
	  	var request8 = req.query.request8;
	  	var tipo = req.query.tipo;
	  	var data = {'request': request,
				'request1': request1,
				'request2': request2,
				'request3': request3,
				'request4': request4,
				'request5': request5,
				'request6': request6,
				'request7': request7,
				'request8': request8,
				'tipo': tipo};
		obj.push(data);
		var o=JSON.stringify(obj);
		res.send({identificador : identificador}); //id is send to the user to know which id has her operation
 		if (obj[0].tipo=="select"){
		    var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
   		}else if (o[0].tipo=="insert"){
	    	var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
		}else{
	   		var query = "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1;  // Hay que pasar un string al servidor
	 	}
	 	//send the event which is hear by the other part of the server
		gestionContract.methods.CreateCustomEvent(o + "-" + id).send({ from : web3.eth.defaultAccount, gas: 300000});
     console.log('***sendRequestInsert*** MySQL custom request was sent');

});

router.get('/sendRequestSelect', function(req, res, next) {
	console.log(1);
	contadorNuevo++;
	identificador=-1;
	for( var i=0; i<espaciosNuevo.length; i++){
		if(espaciosNuevo[i]==0){
			espaciosNuevo[i]=1;
			identificador=i;
		}else{}
	}
	console.log(2);
	if(identificador==-1){
		espaciosNuevo.push(espaciosNuevo.length);
		espaciosNuevo[espaciosNuevo.length-1]=1;
		identificador=espaciosNuevo.length-1;
		resultadoNuevo.push("");
	}else{}
		id=identificador;

		console.log(3);
		var obj = {};
		obj=[];
		var request = req.query.request; 
		var request1 = req.query.request1;
		var request2 = req.query.request2;
		var request3 = req.query.request3;
		var request4 = req.query.request4;
		var tipo = req.query.tipo;
		var data = {'request': request,
			'request1': request1,
			'request2': request2,
			'request3': request3,
			'request4': request4,
			'tipo': tipo};
			console.log(data);
		obj.push(data);
		console.log(obj);
		var o=JSON.stringify(obj);
		res.send({identificador : identificador}); //id is send to the user to know which id has her operation
 		if (obj[0].tipo=="select"){
		    var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
    	}else if (o[0].tipo=="insert"){
	    	var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
		}else{
	   		var query = "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1;  // Hay que pasar un string al servidor
	 	}
	 	//send the event which is hear by the other part of the server
	 	gestionContract.methods.CreateCustomEvent(o + "-" + id).send({ from : web3.eth.defaultAccount, gas: 300000});

	    console.log('***sendRequestSelect*** MySQL custom request was sent');

});

router.get('/obtenerDatos', function(req, res, next) {

	if(contador<10){ //check if there is any free id
		contador++;
	 	for(var i=0; i<10; i++){
	 		if(espacios[i]==0){
	 			espacios[i]=1;
	 			identificador=i+1;//server array positions are from 0 to 9 while smartcontract positions are from 1 to 10
	 			id=i+1;
	 		//	gestionContract.methods.inicializar(identificador).send({ from: web3.eth.defaultAccount, gas: 600000});
	 			//DA ERROR
	 			break;
	 		}else{}
	 	}
		id=identificador;
		res.send({identificador : identificador});//id is send to the user to know which id has her operation
		  var obj = {}
		  obj=[];
		  var request = req.query.request; 
		  var request1 = req.query.request1;
		  var request2 = req.query.request2;//request2 does not go inside the JSON because is the element to compare
		  var tipo = req.query.tipo;
		  var data = {'request': request,
					'request1': request1,
					'tipo': tipo};
		   obj.push(data);
		   var o=JSON.stringify(obj);
		   console.log('***/obtenerDatos*** Sending comparation to smart contract: ' + tipo);
		   gestionContract.methods.setCompare(request2, id).send({ from : web3.eth.defaultAccount, gas: 600000}).then((result1, error1) => {
				console.log('***/obtenerDatos*** Getting stored request from smart contract');
				console.log("***/obtenerDatos*** Devuelvo el identificador: " + identificador);
			 	//Building of the query
			 	if (obj[0].tipo=="select"){
	    		    var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
	       		}else if (obj[0].tipo=="insert"){
	    		    var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
	    		}else{
	    		   	var query = "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1;  // Hay que pasar un string al servidor
				}
	        	gestionContract.methods.CreateCustomEvent( o+ "-" + id).send({ from : web3.eth.defaultAccount });
			
	     });   
	     console.log('***/obtenerDatos*** MySQL custom request was sent');
	 }else{
	 	console.log("***/obtenerDatos*** Demasiados clientes en activo");
	 }
});


router.get('/getEvent', function(req, res, next) {
		var id = req.query.identificador; //user send to the server the id of her query

      	if(comparacion[id-1]=="true"){//if are the same elements
      		console.log("***/GET EVENT*** Comparacion true");
      		res.writeHead(200, {'Content-Type' : 'application/json'});
      		res.end(JSON.stringify({ disssplayR : "Los contenidos son los mismos." }));
      	}else if(comparacion[id-1]=="false"){//if the elements are different
      		console.log("***/GET EVENT*** Comparacion false");
      		res.writeHead(200, {'Content-Type' : 'application/json'});
      		res.end(JSON.stringify({ disssplayR : "Los contenidos no coinciden" + ' ' }));
      	}else{//if the comparation has not been produced
      		res.end(JSON.stringify({ disssplayR : ""  }));
      	}
});


router.get('/getResult', function(req, res, next) {
	
	var id = req.query.identificador; //user send to the server the id of her query
	var metodo = req.query.metodo;

    if(metodo==3){//metodo==3 when it is a compare operation
        if(resultado1[id-1]!="" && resultado1[id-1]!=undefined){//when the result is ready i can send it to the user
      		res.send(JSON.stringify({ disssplay : resultado1[id-1] + ' ' })); 
      		resultado1[id-1]="";
      		espacios[id-1]=0;
      		contador--;
      		gestionContract.methods.limpiarId(id).send({ from: web3.eth.defaultAccount, gas: 600000});
  		}else{
 			// If the result is not ready yet
  	    	res.send(JSON.stringify({ disssplay : "" }));
 		}
    }else{
		if(resultadoNuevo[id]!="" && resultadoNuevo[id]!=undefined){//when the result is ready i can send it to the user
    		res.send(JSON.stringify({ disssplay : resultadoNuevo[id] + ' ' })); 
    		resultadoNuevo[id]="";//Cleaning of the variables used in the server and Blockchain
    		contadorNuevo--;
    		espaciosNuevo[id]=0;
  		}else{
 		// If the result is not ready yet
  		    res.send(JSON.stringify({ disssplay : "" }));
 		}
  	}
});


module.exports = router;
