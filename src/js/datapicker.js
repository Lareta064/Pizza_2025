document.addEventListener("DOMContentLoaded", function () {

	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: 'Предыдущий',
		nextText: 'Следующий',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	$(function(){
		$("#datepicker").datepicker({
			minDate: 0,
			showButtonPanel: true, // Включает панель с кнопками
			currentText: "Сегодня", // Кнопка "Сегодня"
			prevText: "555",
			nextText: "555",
			showMonthAfterYear: false,
			beforeShow: function(input, inst) {
				setTimeout(function() {
					var buttonPane = $(inst.dpDiv).find(".ui-datepicker-buttonpane");
					if (buttonPane.find(".ui-datepicker-clear").length === 0) {
						$("<button>", {
							text: "Удалить",
							class: "ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all",
							click: function() {
								$("#datepicker").val(""); // Очищает input
								$("#datepicker").datepicker("hide"); // Закрывает календарь
							}
						}).appendTo(buttonPane);
					}
				}, 1);
			}
		});
	});
});