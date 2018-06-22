$('#question-form').submit(function(e) {
	e.preventDefault();

	// remove question marks and whitespace to prevent CORS request blocking
	let submittedQuestion = $.trim(this.question.value).replace(/\?/g, '');
	if(submittedQuestion.length > 1) {
		this.reset();
		$.get('https://8ball.delegator.com/magic/JSON/' + submittedQuestion).done(function(data) {
			$('#answer').html(data.magic.answer);

			let historyHtml = $('#response-history-tbody').html()
			historyHtml += `<tr><td><strong>${data.magic['type']}</strong></td></tr>`
			$('#response-history-tbody').html(historyHtml);
		});
	} else {
		$('#missing-question').modal('show');
	}
});