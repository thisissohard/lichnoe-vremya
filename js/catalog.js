var cards = document.querySelectorAll('.card');
var form = document.getElementById('filters');
var empty = document.getElementById('empty');
var more = document.getElementById('more');

// Берём значения отмеченных галочек в группе (type, gender или price)
function getChecked(name) {
    var result = [];
    var boxes = document.querySelectorAll('input[name="' + name + '"]:checked');
    for (var i = 0; i < boxes.length; i++) {
        result.push(boxes[i].value);
    }
    return result;
}

// Фильтр: нажали "Применить"
form.addEventListener('submit', function (event) {
    event.preventDefault(); // чтобы страница не перезагружалась

    var types = getChecked('type');
    var genders = getChecked('gender');
    var prices = getChecked('price');
    var found = 0;

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var ok = true;

    // Если что-то отмечено, но у карточки другое значение, прячем её
    if (types.length > 0 && types.indexOf(card.dataset.type) === -1) {
        ok = false;
    }
    if (genders.length > 0 && genders.indexOf(card.dataset.gender) === -1) {
        ok = false;
    }
    if (prices.length > 0) {
        var priceOk = false;
        for (var j = 0; j < prices.length; j++) {
            var range = prices[j].split('-'); // "1000-2499" -> ["1000", "2499"]
            var price = Number(card.dataset.price);
            if (price >= Number(range[0]) && price <= Number(range[1])) {
                priceOk = true;
            }
    }
    if (!priceOk) {
        ok = false;
        }
    }

    if (ok) {
      card.classList.remove('hide');
      card.classList.remove('extra'); // при фильтре показываем всё найденное
      found++;
    } else {
      card.classList.add('hide');
    }
  }

  // Если ничего нет, показываем надпись
  empty.style.display = found === 0 ? 'block' : 'none';
  more.style.display = 'none';
});

// Кнопка сброса (крестик): показываем всё обратно
form.addEventListener('reset', function () {
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove('hide');
  }
  empty.style.display = 'none';
});

// "Показать больше": открываем скрытые карточки
more.addEventListener('click', function () {
  var extras = document.querySelectorAll('.card.extra');
  for (var i = 0; i < extras.length; i++) {
    extras[i].classList.remove('extra');
  }
  more.style.display = 'none';
});

// Сердечки
var hearts = document.querySelectorAll('.card__fav');
for (var i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener('click', function () {
    this.classList.toggle('active');
    this.textContent = this.classList.contains('active') ? '♥' : '♡';
  });
}