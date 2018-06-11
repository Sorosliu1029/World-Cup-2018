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
  const games = result.result.data.filter(d => d.league_type === '世界杯').forEach(g => {
    g.team1_name_en = COUNTRY_MAP[g.team1_name]
    g.team2_name_en = COUNTRY_MAP[g.team2_name]
  })
  return games
}
