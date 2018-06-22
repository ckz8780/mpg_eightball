$('#question-form').submit(function(e) {
	e.preventDefault();

	// remove question marks and whitespace to prevent CORS request blocking
	// Other characters may still cause this
	let submittedQuestion = $.trim(this.question.value.replace(/\?/g, ''));
	if(submittedQuestion.length > 1) {
		let uri = 'https://8ball.delegator.com/magic/JSON/' + encodeURIComponent(submittedQuestion);
		this.reset();
		$.get(uri).done(function(data) {
			$('#answer').html(data.magic.answer);

			var resultRowCount = $('#response-history-tbody tr').length;
			var historyHtml = $('#response-history-tbody').html();
			
			if(resultRowCount >= 3) {
				$('#response-history-tbody tr:eq(0)').remove();
				historyHtml = $('#response-history-tbody').html();
			}
			
			historyHtml += `<tr><td><strong>${data.magic['type']}</strong></td></tr>`;
			$('#response-history-tbody').html(historyHtml);
		});
	} else {
		$('#missing-question').modal('show');
	}
});