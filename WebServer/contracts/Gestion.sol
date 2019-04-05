pragma solidity ^0.5.0;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**********************************************************STORE DATA AND EMIT EVENTS*********************************************************/

contract Gestion {


	struct datosStruct{
		string result;
		string compare;
		string boolComparation;
		int256 id;
	}
	mapping (int256 => datosStruct) mappingUsuarios;



	
    event customEvent (string mysqlcustom);
    // Event used to send a MySQL Query. The input is the query input and id. It allows to record the query
	
	event customEventResult(string mysqlresult);
	// Event used to send a result. The input is the result and id. 

	function inicializar (int256 identificador) public{
			mappingUsuarios[identificador]=datosStruct("","","",identificador);
	}

	

	function setResult(string memory input, int256 id) public {
		mappingUsuarios[id].result=input;
	}

	/*
	Function setResult : 

		- input: string, int

		- output: none

	Stores the result of the last request in the variable result.
	Modifies the Blockchain, consumes Ether


	*/
	

	function getResult(int256 id) public view returns(string memory)  {
		return mappingUsuarios[id].result;
	}
	
	/*
	Function getResult : 

		- input: int

		- output: string

	Returns the result of the last query, stored in the blockchain in the variable result.
	Only gives the state of a variable, does not modify the blockchain.
	Does not consume Ether

	*/

		
	
	function setCompare (string memory input, int256 id) public {
		mappingUsuarios[id].compare=input;
	}

	/*
	Function setCompare : 

		- input: string, int

		- output: none

	Changes the element to compare.The new input replaces the old one, and is stored in the Blockchain.
	Modifies the Blockchain, consumes Ether

	*/


	function getCompare (int256 id) public view returns(string memory)  {
		return mappingUsuarios[id].compare;
	}
	

	/*
	Function getCompare : 

		- input: int

		- output: string

	Returns the element to compare, stored in the blockchain.
	Only gives the state of a variable, does not modify the blockchain.
	Does not consume Ether

	*/



	


	function getBoolComparation (int256 id) public view returns(string memory)  {
			return mappingUsuarios[id].boolComparation;
	}
	/*
	Function getBoolComparation : 

		- input: int

		- output: string

	Returns the result of the comparation, stored in the blockchain.
	Only gives the state of a variable, does not modify the blockchain.
	Does not consume Ether

	*/



	function compareHashes (int256 id) public  returns(string memory) {
		if(keccak256(bytes(mappingUsuarios[id].result)) == keccak256(bytes(mappingUsuarios[id].compare))){
			mappingUsuarios[id].boolComparation="true";
		}else{
			mappingUsuarios[id].boolComparation="false";
		}
		return mappingUsuarios[id].boolComparation;

	}

	/*
	Function compareHashes : 

		- input: int

		- output: string

	Returns the result of the comparation and changes the result of it.
	The new result replaces the old one, and is stored in the Blockchain.
	Modifies the Blockchain, consumes Ether

	*/





	function limpiarId (int256 id) public  {
			mappingUsuarios[id].result="";
			mappingUsuarios[id].compare="";			
			mappingUsuarios[id].boolComparation="";
	}
	/*
	Function limpiarId : 

		- input: int

		- output: none

	Clean the variables used replacing old values.
	Modifies the Blockchain, consumes Ether

	*/





	function CreateCustomEvent(string memory input) public {
		emit customEvent(input);
	}

	/*
	Function CreateCustomEvent: 

		- input: string

		- output: none

	Emit a mysqlevent. The input of this event is the variable input (which is also the input of the query and the id).
	The event is written in a log in the blockchain when it is emitted.
	*/

	function CreateCustomEventResult(string memory input) public{
		emit customEventResult(input);
	}
	/*
	Function CreateCustomEventResult: 

		- input: string

		- output: none

	Emit a mysqleventresult. The input of this event is the variable input (which is the response of the DDBB and the id).
	The event is written in a log in the blockchain when it is emitted.
	*/
}
