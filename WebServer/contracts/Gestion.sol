pragma solidity ^0.5.0;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**********************************************************STORE DATA AND EMIT EVENTS*********************************************************/

contract Gestion {

	//string result = "No Query"; // The result of the query is stored in this variable

	//string custom = "No request"; // We will store the complete custom request in this variable

	//string compare = "No compare";

	//string boolComparation= "false";

	struct datosStruct{
		string result;
		string custom;
		string compare;
		string boolComparation;
		int256 id;
	}
	mapping (int256 => datosStruct) mappingUsuarios;



	//https://ethereum.stackexchange.com/questions/6121/parse-json-in-solidity
	
    event customEvent (string mysqlcustom, int256 identificador);
    // Event used to send a MySQL Query. The input is the query input. It allows to record the query
	
	event customEventResult(string mysqlresult, int256 identificador);
	
	function inicializar (int256 identificador) public{
		//for(int256 i=1; i<=10; i++){
			mappingUsuarios[identificador]=datosStruct("","","","",identificador);

		//}
	}

	function setCustom (string memory input, int256  id) public {
	///	custom = input;
		mappingUsuarios[id].custom=input;
	}

	/*
	Function setCustom : 

		- input: string

		- output: none

	Changes the input of the query.The new input replaces the old one, and is stored in the Blockchain.
	Modifies the Blockchain, consumes Ether

	*/


	function getCustom (int256  id) public view returns(string memory)  {
		//return custom;
		return mappingUsuarios[id].custom;
	}
	

	/*
	Function getCustom : 

		- input: none

		- output: string

	Returns the input of the query, stored in the blockchain.
	Only gives the state of a variable, does not modify the blockchain.
	Does not consume Ether

	*/


	function setResult(string memory input, int256 id) public {
		//result = input;
		mappingUsuarios[id].result=input;
	}

	/*
	Function setResult : 

		- input: string

		- output: none

	Stores the result of the last request in the variable result.
	Modifies the Blockchain, consumes Ether


	*/
	

	function getResult(int256 id) public view returns(string memory)  {
		//return result;
		return mappingUsuarios[id].result;
	}
	
	/*
	Function getResult : 

		- input: none

		- output: string

	Returns the result of the last query, stored in the blockchain in the variable result.
	Only gives the state of a variable, does not modify the blockchain.
	Does not consume Ether

	*/

		
	
	function setCompare (string memory input, int256 id) public {
		//compare = input;
		mappingUsuarios[id].compare=input;
	}

	/*
	Function setCustom : 

		- input: string

		- output: none

	Changes the input of the query.The new input replaces the old one, and is stored in the Blockchain.
	Modifies the Blockchain, consumes Ether

	*/


	function getCompare (int256 id) public view returns(string memory)  {
	//	return compare;
		return mappingUsuarios[id].compare;
	}
	

	/*
	Function getCustom : 

		- input: none

		- output: string

	Returns the input of the query, stored in the blockchain.
	Only gives the state of a variable, does not modify the blockchain.
	Does not consume Ether

	*/



	


	function getBoolComparation (int256 id) public view returns(string memory)  {
			//return boolComparation;
			return mappingUsuarios[id].boolComparation;
	}

	function compareHashes (int256 id) public  returns(string memory) {
		if(keccak256(bytes(mappingUsuarios[id].result)) == keccak256(bytes(mappingUsuarios[id].compare))){
			mappingUsuarios[id].boolComparation="true";
		}else{
			mappingUsuarios[id].boolComparation="false";
		}
		return mappingUsuarios[id].boolComparation;

	}

	function limpiarId (int256 id) public  {
			mappingUsuarios[id].custom="";
			mappingUsuarios[id].result="";
			mappingUsuarios[id].compare="";			
			mappingUsuarios[id].boolComparation="";
	}

	function traducir(string memory input) public returns (int256 id){
			if(keccak256(bytes(input))==keccak256("1")){
				id=1;
			}else if(keccak256(bytes(input))==keccak256("2")){
				id=2;
			}else if(keccak256(bytes(input))==keccak256("3")){
				id=3;
			}else if(keccak256(bytes(input))==keccak256("4")){
				id=4;
			}else if(keccak256(bytes(input))==keccak256("5")){
				id=5;
			}else if(keccak256(bytes(input))==keccak256("6")){
				id=6;
			}else if(keccak256(bytes(input))==keccak256("7")){
				id=7;
			}else if(keccak256(bytes(input))==keccak256("8")){
				id=8;
			}else if(keccak256(bytes(input))==keccak256("9")){
				id=9;
			}else if(keccak256(bytes(input))==keccak256("10")){
				id=10;
			}else{
				id=99;
			}
	}
	

	function CreateCustomEvent(string memory input, int256 identificador) public {
		emit customEvent(input, identificador);
	}

	/*
	Function CreateCustomEvent: 

		- input: string

		- output: none

	Emit a mysqlevent. The input of this event is the variable input (which is also the input of the query).
	The event is written in a log in the blockchain when it is emitted.


	*/
	function CreateCustomEventResult(string memory input, int256 identificador) public{
		emit customEventResult(input, identificador);
	}

}
