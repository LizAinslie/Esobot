class Brainfuck {
    constructor(code, input = '') {
        this._code = code.replace(/[^+-\[\].,<>]+/, '');
        this._inps = input;
        this._output = '';
    }
    
    _next(parsed, pointer, array) {
        let char = this._code.charAt(parsed);
        let f = null;
        let i = array[pointer] - 1;
    
        parsed += 1;
    
        switch (char) {
            case '+':
                array[pointer] = (array[pointer] + 1) % 255;
                break;
            case '-':
                array[pointer] = (array[pointer] - 1) % 255;
                break;
            case '>':
                pointer += 1;
                array[pointer] = array[pointer] || 0;
                break;
            case '<':
                pointer -= 1;
                break;
            case ',':
                array[pointer] = this._inps.slice(0, -1).charCodeAt(0);
                this._next(parsed, pointer, array);
                return parsed;
            case '.':
                this._output += String.fromCharCode(array[pointer]);
                break;
            case '[':
                if (i >= 0) {
                    for (; i >= 0; i -= 1) {
                        f = this._next(parsed, pointer, array);
                        parsed = (i === 0 ? f : parsed);
                    }
                }
                break;
            case ']':
                return parsed;
        }
    
        if (this._code.length > parsed) {
            return this._next(parsed, pointer, array);
        } else {
            process.exit();
        }
    }
    
    exec() {
        this._next(0, 0, [0]);
        return this._output;
    }
}

module.exports = Brainfuck;