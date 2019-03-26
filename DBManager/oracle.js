//////////////////////////////////////////////////////////////////
/***************    CONNECTION WITH THE SMART CONTRACT*************/

var Web3            = require('web3'),
    path            = require('path')
    GestionJSON  = require(path.join(__dirname, '../WebServer/build/contracts/Gestion.json'));

const contractAddress = "0x586f02AF0f59867CC3D73B663a718Af9468d2142";


if(typeof web3 !== 'undefined'){
	web3 = new Web3(web3.currentProvider);
}
else{
	//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
	web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
}


 web3.eth.getAccounts((err,accounts)=> {
	if (err) return;
		web3.eth.defaultAccount = accounts[0];
}); // Used to define the default acccount. This account will pay for the transactions


var gestionContract = new web3.eth.Contract(GestionJSON.abi, contractAddress, { gas: 4000000 });



//////////////////////////////////////////////////////////////////////////////////

/*************************MySQL SIDE QUERY CALLED BY AN EVENT *************************/

/*var CustomMySQLEventListener = gestionContract.events.customEvent({fromBlock:0},()function(err,result){
  if(!err){
    console.log('Query sent!');
    callMySQLCustom();
  }
  else{
    console.log(err);
  }
}); // This instance listen to the MySQL Event. If this event is detected, 
    // it sends a MySQL Query (using the function callMySQLCustom)
	*/
	gestionContract.events.customEvent({fromBlock:null}, (error, event) => { console.log(event); }).on('data',(event) => {
	//Cambiar el customEvent fromBlock a ultimo bloque*************************************************************
  //errores
    console.log('Received SQL query event! ----- ' + event.args);
    callMySQLCustom(event);
  });
  
// This instance listen to the MySQL Event. If this event is detected, 
    // it sends a MySQL Query (using the function callMySQLCustom)

var prepare_query; // The input of the query is stored in this variable

var mysql = require('mysql'); //import the mysql module

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
  //	password: "gisai", // Uncomment if a password is needed
	database: "Blockchain"
}); // This instance is used to connect the oracle to the mysql database


con.connect(function(err){
	if (err) throw err;
	console.log("Connected to the Database!\n");
}); // Connect the oracle with the database




/*
Function callMySQLCustom : 

	- input: none

	- output: none

Send a MySQL query. The result of the query is stored in the Blockchain

	Uses the GetString method of the Smart Contract, and defines the data returned
by this method as the input of the query.
The result of the query ( String type) is stored in the Blockchain
It modifies the Blockchain and consummes ether

*/

function callMySQLCustom( event){
  gestionContract.methods.getCustom(4).call({ from : web3.eth.defaultAccount}).then((result, error) => {
    if(!error){
      
      
      var obj = JSON.parse(result);
  
          if (obj[0].tipo=="select"){
          //console.log(obj[0].tipo + "select");
          var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
          }else if (obj[0].tipo=="insert"){
            //console.log(obj[0].tipo + "INSERT");
          var query = "INSERT INTO `animalTransaccion` (`Animal`, `identificadorAnimal`, `identificadorLoteDes`, `identificadorDespiece`, `identificadorNegocio`, `tipoNegocio`, `tipoMovimiento`, `usuario`, `fecha`) VALUES ('" + obj[0].request +"', '" + obj[0].request1 + "', '" + obj[0].request2 + "', '" + obj[0].request3 + "', '" + obj[0].request4 + "', '" +  obj[0].request5 + "', '" + obj[0].request6 + "', '" + obj[0].request7 + "', '" + obj[0].request8 + "')";
          }else{
          var query = "Select * from animalTransaccion where identificadorAnimal= '" + obj[0].request + "' and identificadorNegocio = '" + obj[0].request1 + "'";  // Hay que pasar un string al servidor

          }
     // var query = "Select * from animalTransaccion where identificadorAnimal like '" + obj[0].request + "' and identificadorLoteDes like '" + obj[0].request1 + "' and identificadorDespiece like '" + obj[0].request2 + "' and identificadorNegocio like '"+ obj[0].request3 + "' and tipoNegocio like "  + obj[0].request4;
		console.log("Query to perform in DB: "+query);
      prepare_custom = query;
    }
    else{
      console.error(error);
    }
    con.query(prepare_custom, function(err, result){
      if (err) throw err;
      console.log('Result:' + JSON.stringify(result));

      gestionContract.methods.setResult(JSON.stringify(result), 4).send({ from : web3.eth.defaultAccount,gas: 2000000  });
      gestionContract.methods.CreateCustomEventResult(JSON.stringify(result), 4).send({ from : web3.eth.defaultAccount });

    });
  });
}


