#!/usr/bin/python3

import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

URL = 'https://www.fifa.com/worldcup/matches/#groupphase'

TRANSLATION_MAP = {
    'IR Iran': 'Iran',
    'Korea Republic': 'Korea'
}

def get_html(url):
    res = requests.get(url)
    if res.ok:
        return res.text
    res.raise_for_status()

def parse(html):
    games = []
    soup = BeautifulSoup(html, 'lxml')
    for i, game in enumerate(soup.find_all('div', class_='fixture')):
        if i >= 48:
            break
        info = game.find('div', class_='fi-mu__m')
        home, away = info.find('div', class_='home'), info.find('div', class_='away')

        full = home.find('span', class_='fi-t__nText').text
        full = TRANSLATION_MAP.get(full, full)
        home_info = {
            'full': full,
            'short': home.find('span', class_='fi-t__nTri').text
        }

        full = away.find('span', class_='fi-t__nText').text
        full = TRANSLATION_MAP.get(full, full)
        away_info = {
            'full': full,
            'short': away.find('span', class_='fi-t__nTri').text
        }
        date = game.find('span', class_='fi-s__matchDate').text
        time = game.find('div', class_='fi-s__date-HHmm')['data-timeutc']

        games.append({
            'objectId': '5b1d5b947b1a02001a955e{:02d}'.format(i),
            'home': home_info,
            'away': away_info,
            'date': date,
            'timeutc': time,
            "ACL": {
                "*": {
                "read": True
                }
            },
            "createdAt": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.000Z'),
            "updatedAt": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.000Z')
        })

    return games

def main():
    html = get_html(URL)
    games = parse(html)
    with open('data/groups.json', 'wt', encoding='utf-8') as f:
        json.dump({'results': games}, f, indent=2)


if __name__ == '__main__':
    main()