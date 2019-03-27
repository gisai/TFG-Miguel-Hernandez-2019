var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Web3            = require('web3'),
    path            = require('path')
    GestionJSON  = require(path.join(__dirname, '../build/contracts/Gestion.json'));

var resultado="";
var resultado1=["","","","","","","","","",""];
var espacios=[0,0,0,0,0,0,0,0,0,0];
var comparacion=["","","","","","","","","",""];

var contador=0;
const contractAddress = "0x586f02AF0f59867CC3D73B663a718Af9468d2142";

if(typeof web3 !== 'undefined'){
	web3 = new Web3(web3.currentProvider);
}
else{
  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
}

web3.eth.getAccounts((err,accounts)=> {
	if (err) return
		web3.eth.defaultAccount = accounts[0];
}); // used to define the default account. this account will pay for the transactions



var gestionContract = new web3.eth.Contract(GestionJSON.abi, contractAddress, { gas: 4000000 });


/*************************RESULT CALLED BY AN EVENT *************************/


gestionContract.events.customEventResult({fromBlock:null}, (error, event) => { console.log(event); }).on('data',(event) => {
	//Cambiar el customEvent fromBlock a ultimo bloque*************************************************************
  //errores
  console.log(event);
    console.log('Received result event! - ');
    var partes=event.returnValues.mysqlresult.split("--", 2);
    console.log("Parte 1: " + partes[0] + " - Parte 2: " + partes[1]);
    callMyResult(partes);
});

function callMyResult(array){
	console.log("saco el resultado de la casilla: " + array[1]);
		gestionContract.methods.compareHashes(array[1]).send({ from : web3.eth.defaultAccount, gas:300000}).then((result, error) => {
			console.log("HASSSHES COMPARADOS");
	
			gestionContract.methods.getBoolComparation(array[1]).call({ from : web3.eth.defaultAccount, gas:300000}).then((result, error) => {
				console.log("El resultado de la comparacion es: " + result);
				comparacion[id-1]=result;
			});
		});
  gestionContract.methods.getResult(array[1]).call({ from : web3.eth.defaultAccount}).then((result, error) => {
    if(!error){
  		resultado1[array[1]-1]=result;
  		console.log("Resultado en la casilla " + array[1] + " es: " + resultado1[array[1]-1]);
  	//resultado=result;
    }
    else{
      console.error(error);
    }
  });
}


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web App for Smart Contract' });
});
//INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('Vaca', 'vaca0', 'asdfgh', 'asdfgh', 'asdfgh', '0', '0', '0', CURRENT_TIMESTAMP);
router.get('/sendRequestInsert', function(req, res, next) {
	/*https://stackoverflow.com/questions/34385499/how-to-create-json-object-node-js*/
 if(contador<10){
 	contador++;
 	 for(var i=0; i<10; i++){
 		if(espacios[i]==0){
 			espacios[i]=1;
 			identificador=i+1;
 			id=i+1;
 		//	gestionContract.methods.inicializar(identificador).send({ from: web3.eth.defaultAccount, gas: 600000});
 			//DA ERROR
 			break;
 		}else{}
 	}
	id=identificador;
	  var o = {}
	  o=[];
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
	   o.push(data);
	   o=JSON.stringify(o);
	    console.log('Sending request to smart contract: '+ tipo);
      gestionContract.methods.setCustom(o, id).send({ from : web3.eth.defaultAccount, gas: 300000}).then((result, error) => { 
    	//añadido lo de gas
    	//para que no de error out of gas

    //------------------------------------------------------------
		console.log('Getting stored request from smart contract');
     	gestionContract.methods.getCustom(id).call({ from : web3.eth.defaultAccount, gas: 300000}).then((result, error) => {
		if (result){
			res.send({identificador : identificador});
		 	var obj = JSON.parse(result);

		 	if (obj[0].tipo=="select"){
    		    var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;	
      		}else if (obj[0].tipo=="insert"){
    		    var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
    		}else{
    		   	var query = "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1;  // Hay que pasar un string al servidor
    		}
        gestionContract.methods.CreateCustomEvent(query+ "-" + id, id).send({ from : web3.eth.defaultAccount });
		 } else {
		 	 console.log("Error: "+ error);
		 	 espacios[id-1]=0;
//		 	 resultado1[id-1]="";
		 	 identificador=98;
		 	 res.send({identificador : identificador});
      		 contador--;		 }		
     });
     });   
     console.log('MySQL custom request was sent');
 }else{
 	console.log("Demasiados clientes en activo");
 }

});

router.get('/sendRequestSelect', function(req, res, next) {
	/*https://stackoverflow.com/questions/34385499/how-to-create-json-object-node-js*/
if(contador<10){
 	contador++;
 	for(var i=0; i<10; i++){
 		if(espacios[i]==0){
 			espacios[i]=1;
 			identificador=i+1;
 			id=i+1;
 		//	gestionContract.methods.inicializar(identificador).send({ from: web3.eth.defaultAccount, gas: 600000});
 			//DA ERROR
 			break;
 		}else{}
 	}
	id=identificador;

	  var o = {};
	  o=[];
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
	   o.push(data);
	   o=JSON.stringify(o);
	    console.log('Sending request to smart contract: '+ tipo );
    gestionContract.methods.setCustom(o,id).send({ from : web3.eth.defaultAccount, gas: 300000}).then((result, error) =>{ 
    console.log(1 + o + "-" + id);
 
		console.log('Getting stored request from smart contract');
     	console.log("2 - "  + id);
     	gestionContract.methods.getCustom(id).call({ from : web3.eth.defaultAccount, gas: 300000}).then((result, error) => {
		console.log(id  + " paso3 - " + result );
		if (result){
			res.send({identificador : identificador});

		 	var obj = JSON.parse(result);
		 	console.log(4);
		 	console.log(result);
		 	obj=result;
		 	if (obj[0].tipo=="select"){
     		    var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
        		}else if (obj[0].tipo=="insert"){
     		    var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
     		}else{
     		   	var query = "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1;  // Hay que pasar un string al servidor
			 }
			 console.log('Entro al evento - ' + id);
         		gestionContract.methods.CreateCustomEvent(query + "-" + id, 4).send({ from : web3.eth.defaultAccount, gas: 300000});
			 console.log('Salgo del evento');
		 } else {
		 	 console.log("Error: "+ error);
		 	 espacios[id-1]=0;
//		 	 resultado1[id-1]="";
		 	 identificador=98;
		 	 res.send({identificador : identificador});
      		 contador--;
      			//gestionContract.methods.limpiarId(id).send({ from: web3.eth.defaultAccount, gas: 600000});


		}	
     	}); 
     	}); 
     	console.log(5);  
     console.log('MySQL custom request was sent');
 }else{
 	console.log("Demasiados clientes en activo");
 }
     //-------------------------------------------------------------------
 
    //  	gestionContract.methods.getResult().call({ from : web3.eth.defaultAccount}).then((result) => {
    //   res.writeHead(200, {'Content-Type' : 'application/json'});
    //   res.end(JSON.stringify({ disssplay : result + ' ' }));
    // });
});

router.get('/obtenerDatos', function(req, res, next) {
	/*https://stackoverflow.com/questions/34385499/how-to-create-json-object-node-js*/
if(contador<10){
	contador++;
 	for(var i=0; i<10; i++){
 		if(espacios[i]==0){
 			espacios[i]=1;
 			identificador=i+1;
 			id=i+1;
 		//	gestionContract.methods.inicializar(identificador).send({ from: web3.eth.defaultAccount, gas: 600000});
 			//DA ERROR
 			break;
 		}else{}
 	}
	id=identificador;
	res.send({identificador : identificador});

	  var o = {}
	  o=[];
	  var request = req.query.request; 
	  var request1 = req.query.request1;
	  var request2 = req.query.request2;
	  var tipo = req.query.tipo;


	  var data = {'request': request,
				'request1': request1,
				'tipo': tipo};
	   o.push(data);
	   o=JSON.stringify(o);
	    console.log('Sending comparation to smart contract: ' + tipo);
 
    gestionContract.methods.setCustom(o, id).send({ from : web3.eth.defaultAccount, gas: 300000}).then((result2, error2) => {
    gestionContract.methods.setCompare(request2, id).send({ from : web3.eth.defaultAccount, gas: 600000}).then((result1, error1) => {

    //añadido lo de gas
    //para que no de error out of gas
//--------------------------------------------------------------------------------------------------------------
		console.log('Getting stored request from smart contract');
     	gestionContract.methods.getCustom(id).call({ from : web3.eth.defaultAccount}).then((result, error) => {
		if (result){
			console.log("Devuelvo el identificador: " + identificador);
		 	var obj = JSON.parse(result);
		 	//console.log(obj[0].tipo);

		 	if (obj[0].tipo=="select"){
    		    var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
       		}else if (obj[0].tipo=="insert"){
    		    var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
    		}else{
    		   	var query = "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1;  // Hay que pasar un string al servidor
			}
        gestionContract.methods.CreateCustomEvent( query+ "-" + id, id).send({ from : web3.eth.defaultAccount });
		 } else {
		 	 console.log("Error: "+ error);
		 	 espacios[id-1]=0;
//		 	 resultado1[id-1]="";
		 	 identificador=98;
		 	 //res.end({identificador : identificador});
      		 contador--;
      		//gestionContract.methods.limpiarId(id).send({ from: web3.eth.defaultAccount, gas: 600000});
		 }		
     });   
	 }); 
  });     
     console.log('MySQL custom request was sent');
//-----------------------------------------------------------------------------------------------------------------



	// gestionContract.methods.getBoolComparation().call({ from : web3.eth.defaultAccount, gas:300000}).then((result) => {
	// 	console.log("La comparacion es: " +result);
	// 	if(result=="true"){
	// 		console.log("El contenido es el mismo. ");
	// 		res.writeHead(200, {'Content-Type' : 'application/json'});
 //      		res.end(JSON.stringify({ disssplay : "Los contenidos son los mismos." }));
	// 	}else{
	// 		console.log("Los contenidos son diferentes. ");
	// 		res.writeHead(200, {'Content-Type' : 'application/json'});
 //      		res.end(JSON.stringify({ disssplay : "Los contenidos no coinciden" + ' ' }));
	// 	}
	// });
 }else{
 	console.log("Demasiados clientes en activo");
 }
});

// router.get('/comparar', function(req, res, next) {

// 	gestionContract.methods.compareHashes().send({ from : web3.eth.defaultAccount, gas:300000});
// 	gestionContract.methods.getBoolComparation().call({ from : web3.eth.defaultAccount, gas:300000}).then((result) => {
// 		console.log("La comparacion es: " +result);
// 		if(result=="true"){
// 			console.log("El contenido es el mismo. ");
// 		}else{
// 			console.log("Los contenidos son diferentes. ");
// 		}
// 	});
// 	});

 //	gestionContract.methods.getResult().call({ from : web3.eth.defaultAccount}).then((result0) => {
 //   	gestionContract.methods.getCompare().call({ from : web3.eth.defaultAccount}).then((result1) => {
    		//console.log(result0);
    		//console.log(result1)
    	
 //   var datosDB = JSON.stringify(result0);
 //   var entrada = JSON.stringify(result1);
    //console.log("Data: " + data);
    //console.log(datosDB);
    //console.log(entrada);
 //   var hashentrada = crypto.createHash('sha1').update(entrada).digest('base64');
 //	var hashDB = crypto.createHash('sha1').update(datosDB).digest('base64');
 //	console.log(hashentrada);
 //   console.log(hashDB);
 //   	});
 //   });



router.get('/getRequest', function(req, res, next) {
	
	 	console.log('Getting stored request from smart contract');
    	gestionContract.methods.getCustom().call({ from : web3.eth.defaultAccount}).then((result) => {
		if (result){
			var obj = JSON.parse(result);

			if (obj[0].tipo=="select"){
      		res.writeHead(200, {'Content-Type' : 'application/json'});  // MIME Type / Internet Media Type
      		res.end(JSON.stringify({ getcccustom :  "Select (tipoMovimiento, usuario, fecha) from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorLoteDes = " + obj[0].request1 + " and identificarDespiece =  " + obj[0].request2 + " and identificadorNegocio = "+ obj[0].request3 + " and tipoNegocio = "  + obj[0].request4  }));  // Hay que pasar un string al servidor
      		}else if(obj[0].tipo=="insert"){
      		res.writeHead(200, {'Content-Type' : 'application/json'});  // MIME Type / Internet Media Type
      		res.end(JSON.stringify({ getcccustom :  "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')"}));
      		}else{
      		res.writeHead(200, {'Content-Type' : 'application/json'});  // MIME Type / Internet Media Type
      		res.end(JSON.stringify({ getcccustom :  "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1}));  // Hay que pasar un string al servidor
      		}
		} 
    	});
});


 // router.get('/executeRequest', function(req, res, next) {
 // 	/*https://es.stackoverflow.com/questions/44339/c%C3%B3mo-puedo-obtener-el-valor-de-un-item-de-un-jsonarray*/
 // 	 	gestionContract.methods.getCustom().call({ from : web3.eth.defaultAccount}).then((result, error) => {
 // 		if (result){
 // 			var obj = JSON.parse(result);

 // 			if (obj[0].tipo=="select"){
 //    		    	var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
 //       		}else if (obj[0].tipo=="insert"){
 //    		    	var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
 //    			}else{
 //   		   		var query = "Select * from animalTransaccion where identificadorAnimal= " + obj[0].request + " and identificadorNegocio = " + obj[0].request1;  
 //    			}
      		
		
 //        gestionContract.methods.CreateCustomEvent( toString(query) ).send({ from : web3.eth.defaultAccount });
 // 		} else {
 // 			 console.log(error);
 // 		}		
 //     });   
 //     console.log('MySQL custom request was sent');
 // });

router.get('/getEvent', function(req, res, next) {
		var id = req.query.identificador; 
			console.log("COMPARACION:::: " + comparacion[id-1] + " e id " + id);
	 	//gestionContract.methods.getBoolComparation(id).call({ from : web3.eth.defaultAccount}).then((result) => {
      		if(comparacion[id-1]=="true"){
      		console.log("Comparacion trueeeeeee");
      		res.writeHead(200, {'Content-Type' : 'application/json'});
      		res.end(JSON.stringify({ disssplayR : "Los contenidos son los mismos." }));
      		}else if(comparacion[id-1]=="false"){
      		console.log("Comparacion falseee");
      		res.writeHead(200, {'Content-Type' : 'application/json'});
      		res.end(JSON.stringify({ disssplayR : "Los contenidos no coinciden" + ' ' }));
      		}else{
      		res.end(JSON.stringify({ disssplayR : "juju"  }));
      		}
      //	});
});

router.get('/getResult', function(req, res, next) {
	
//	gestionContract.methods.getResult().call({ from : web3.eth.defaultAccount}).then((result) => {
	var id = req.query.identificador; 
	//var indicador = req.query.indicador; 

	console.log("GET RRRRESULT: ---- Id: " + id + " - resultado: " + resultado1[id-1]);

	if(resultado1[id-1]!="" && resultado1[id-1]!=undefined){
     // res.writeHead(200, {'Content-Type' : 'application/json'});
     // res.send({indicador : "Mensaje recibido"});
      res.send(JSON.stringify({ disssplay : resultado1[id-1] + ' ' }));
      console.log("GET RRRRESULT 2: ---- Id: " + id + " - resultado: " + resultado1[id-1]);
      resultado1[id-1]="";
      contador--;
      espacios[id-1]=0;
      gestionContract.methods.limpiarId(id).send({ from: web3.eth.defaultAccount, gas: 600000});

      console.log("TRATO DE RECUPERAR: " + resultado1[id-1] + " es el resultado, el contador esta a: "+ contador+ "y los espacios son "+espacios);
    //AQUI LIBERO TODO!!
      //res.end(JSON.stringify({ disssplay : resultado1[id] + ' ' }));
 	}else{
 	// si el campo esta vacio puedo guardar datos
  	    res.send(JSON.stringify({ disssplay : "" }));
 	}	
 		//if (indicador) {
 		//	resultado="";
 		//}
      //resultado1[id]="";
    });
//});


module.exports = router;
