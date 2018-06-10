"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPureRandomResult() {
    const random = Math.random();
    if (random <= 0.4) {
        return 'win';
    }
    else if (random >= 0.6) {
        return 'lose';
    }
    else {
        return 'draw';
    }
}
exports.getPureRandomResult = getPureRandomResult;
//# sourceMappingURL=utils.js.map