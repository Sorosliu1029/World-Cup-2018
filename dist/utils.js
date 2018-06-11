"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise-native");
async function get_games() {
    const options = {
        url: 'http://platform.sina.com.cn/sports_other/odds_getAicaiData',
        qs: {
            app_key: '3979320659',
            type: 'jczq',
            format: 'json'
        },
        json: true
    };
    const result = await rp(options);
    console.log(result);
    const games = result.result.data.filter(d => d.league_type === '世界杯');
    console.log(games.length);
}
exports.get_games = get_games;
//# sourceMappingURL=utils.js.map