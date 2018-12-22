class Pair {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

class Fish {
    constructor(code, input = '') {
        this._nchars = '0123456789abcdef';
        this._arithmetic = '+-*%'; // not division, as it requires special handling
        this._comparison = { '=': '==', '(': '<', ')': '>' };
        this._directions = { '>': new Pair(1,0), '<': new Pair(-1,0), 'v': new Pair(0,1), '^': new Pair(0,-1) };
        this._mirrors = {
            "/": (x, y) => new Pair(-y, -x),
            "\\": (x, y) => new Pair(y, x),
            "|": (x, y) => new Pair(-x, y),
            "_": (x, y) => new Pair(x, -y),
            "#": (x, y) => new Pair(-x, -y)
        };
    }
}