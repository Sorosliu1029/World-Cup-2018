import * as rp from 'request-promise-native'
import { COUNTRY_MAP } from './consts'

export async function get_games() {
  const options = {
    url: 'http://platform.sina.com.cn/sports_other/odds_getAicaiData',
    qs: {
      app_key: '3979320659',
      type: 'jczq',
      format: 'json',
    },
    json: true,
  }

  const result = await rp(options)
  const games = result.result.data.filter(d => d.league_type === '世界杯')
  games.forEach(g => {
    if (g.team1_name === '沙特') g.team1_name = '沙特阿拉伯'
    if (g.team2_name === '沙特') g.team2_name = '沙特阿拉伯'
    if (g.team1_name === '哥斯达黎') g.team1_name = '哥斯达黎加'
    if (g.team2_name === '哥斯达黎') g.team2_name = '哥斯达黎加'

    g.team1_name_en = COUNTRY_MAP[g.team1_name]
    g.team1_flag = `https://cdn.ruguoapp.com/fifa/flagv2/${g.team1_name_en}.png`
    g.team2_name_en = COUNTRY_MAP[g.team2_name]
    g.team2_flag = `https://cdn.ruguoapp.com/fifa/flagv2/${g.team2_name_en}.png`

    g.date = g.date.substr(-5)
  })
  return games
}
