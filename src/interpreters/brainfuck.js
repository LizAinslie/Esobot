class Brainfuck {
	constructor(code, input = '') {
		// Constants
		this.MEMORY_SIZE = 30000;
		this._memory = new Array(this.MEMORY_SIZE).fill(0);
		
		// Initialised Constants
		this._code = code.trim();
		this._inps = input.trim();
		
		// Instruction pointer (Points to the current INSTRUCTION)
		this._ipointer = 0;
		
		// Memory pointer (Points to a cell in MEMORY)
		this._mpointer = 0;
		
		// Address stack. Used to track addresses (index) of left brackets
		this._astack = [];
		
		// The output, what the fuck does it look like?
		this._output = '';
	}
	
	_resetState() {
		// Clear memory, reset pointers to zero.
		this._memory.fill(0);
		this._ipointer = 0;
		this._mpointer = 0;
		this._output = '';
		this._input = '';
		this._code = '';
		this._astack = [];
	}
	
	_sendOutput(value) {
		this._output += String.fromCharCode(value);
	}
	
	_getInput() {
		// Set a default value to return in case there is no input to consume
		let val = 0;
	
		// If input isn't empty
		if (this._inps) {
			// Get the character code of the first character of the string
			val = this._inps.charCodeAt(0);
			
			// Remove the first character from the string as it is "consumed" by the program
			this._inps = this._inps.substring(1);
		}
	
		return val;
	}
	
	exec() {
		let end = false;
	
		while (!end) {
			switch (this._code[this._ipointer]) {
				case '>':
					if (this._mpointer == this._memory.length - 1) this._memory.push(0, 0, 0, 0, 0);
					this._mpointer++;
					break;
				case '<':
					if (this._mpointer > 0) this._mpointer--;
					break;
				case '+':
					this._memory[this._mpointer]++;
					break;
				case '-':
					this._memory[this._mpointer]--;
					break;
				case '.':
					this._sendOutput(this._memory[this._mpointer]);
					break;
				case ',':
					this._memory[this._mpointer] = this._getInput();
					break;
				case '[':
					if (this._memory[this._mpointer]) this._astack.push(this._ipointer);
					else { // Skip to matching right bracket
						let count = 0;
						while (true) {
							this._ipointer++;
							if (!this._code[this._ipointer]) break;
							if (this._code[this._ipointer] === "[") count++;
							else if (this._code[this._ipointer] === "]") {
								if (count) count--;
								else break;
							}
						}
					}
					break;
				case ']':
					this._ipointer = this._astack.pop() - 1;
					break;
				case undefined: // We have reached the end of the program
					end = true;
					break;
				default: // We ignore any character that are not part of regular Brainfuck syntax
					break;
			}
			
			this._ipointer++;
		}
		
		return this._output;
	}
}

module.exports = Brainfuck;