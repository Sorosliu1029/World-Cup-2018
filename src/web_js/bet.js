function get_bet_rates() {
  return $('.bet').map(function(index, ele) {
    return [
      ele.innerText.split(',').map(function(n) {
        return 90 / Number(n)
      }),
    ]
  })
}

function update_results(results) {
  var results_ele = $('.result')
  var homes = $('.home')
  var aways = $('.away')
  results_ele.map(function(index, ele) {
    var text = ele.innerText
    switch (results[index]) {
      case 0:
        text = homes[index].innerText + '会赢'
        break
      case 1:
        text = '两队打平'
        break
      case 2:
        text = aways[index].innerText + '会赢'
        break
      default:
        break
    }
    ele.innerText = text
  })
}

function translate(bet_rates, total_score) {
  var scores = total_score.map(function(s) {
    return s / 100
  })
  if (scores.length < 5) {
    scores = scores.concat(Array(5 - scores.length).fill(0.1))
  }
  shuffle(scores)
  var results = []

  for (var i = 0; i < bet_rates.length; i++) {
    var max_value = 0
    var max_index = 0
    var value
    for (var j = 0; j < 3; j++) {
      value = bet_rates[i][j] * scores[j]
      if (value > max_value) {
        max_value = value
        max_index = j
      }
    }
    results.push(max_index)
  }

  return results
}

function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}
