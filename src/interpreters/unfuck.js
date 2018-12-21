// const _ = require('@railrunner16/raildash');

const { chr } = require('../utils');

class Unfuck {
    constructor(code, input = '') {
        this._code = code.trim();
        this._tape = [0];
        this._inps = input;
        this._op = '';
        this._output = '';
        
        // Counters
        this._pard = 0;
        this._parp = 1;
        this._ptrd = 1;
        
        this._pPtr = 0;
        this._tPtr = 0;
        this._iPtr = 0;
        
        this._ops = {
            '^': this._invAll.bind(this),
            '~': this._invParp.bind(this),
            '!': this._invPard.bind(this),
            '?': this._condSkip.bind(this),
            '<': this._backCell.bind(this),
            '>': this._forwCell.bind(this),
            '-': this._decrCell.bind(this),
            '+': this._incrCell.bind(this),
            '.': this._outp.bind(this),
            ',': this._inp.bind(this)
        };
    }
    
    _invParp() {
        this._parp = -this._parp;
    }
    
    _invPard() {
        this._pard = -this._pard;
    }
    
    _invAll() {
        this._invParp();
        this._invPard();
        this._ptrd = -this._ptrd;
    }
    
    _condSkip() {
        if (this._tape[this._tPtr] > 0) this._pPtr += this._ptrd;
    }
    
    _backCell() {
        if (this._tPtr > 0) this._tPtr -= 1;
    }
    
    _forwCell() {
        this._tPtr += 1;
        if (this._tPtr == this._tape.length) this._tape.push(0);
    }
    
    _decrCell() {
        this._tape[this._tPtr] = (this._tape[this._tPtr] + 255) % 256;
    }
    
    _incrCell() {
        this._tape[this._tPtr] = (this._tape[this._tPtr] + 1) % 256;
    }
    
    _outp() {
        this._output = chr(this._tape[this._tPtr]);
    }
    
    _inp() {
        if (this._iPtr < this._inps.length) {
            this._tape[this._tPtr] = this._inps.split('')[this._iPtr].charCodeAt(0);
            this._iPtr = this._iPtr + 1;
        } else {
            this._tape[this._tPtr] = 0;
        }
    }
    
    exec() {
        while (this._pPtr < this._code.length) {
            this._op = this._code.charAt(this._pPtr);
            if (this._op == "(") this._pard += this._parp;
            else if (this._op == ")") this._pard -= this._parp;
            else if (this._op in this._ops) if (this._pard < 1) this._ops[this._op]();
            this._pPtr += this._ptrd;
        }
        return this._output;
    }
}

module.exports = Unfuck;