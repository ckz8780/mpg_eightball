function getClass(resType) {
	
	// Returns a class name given a response type

	switch(resType) {
		case 'Contrary':
			return 'text-danger';
		case 'Affirmative':
			return 'text-success';
	}
	return 'text-secondary';
}

$('#question-form').submit(function(e) {
	e.preventDefault();

	// remove question marks and whitespace to prevent CORS request blocking
	// Other characters may still cause this
	let submittedQuestion = $.trim(this.question.value.replace(/\?/g, ''));
	if(submittedQuestion.length > 1) {
		let uri = 'https://8ball.delegator.com/magic/JSON/' + encodeURIComponent(submittedQuestion);
		this.reset();
		$.get(uri).done(function(data) {
			$('#answer').hide().html(`${data.magic.answer}.`).fadeIn();

			var resultRowCount = $('#response-history-tbody tr').length;
			var historyHtml = $('#response-history-tbody').html();
			
			if(resultRowCount >= 3) {
				$('#response-history-tbody tr:eq(0)').fadeOut().remove();
				historyHtml = $('#response-history-tbody').html();
			}
			let resType = data.magic['type'];
			historyHtml += `<tr><td><strong class="${getClass(resType)}">${resType}</strong></td></tr>`;
			$('#response-history-tbody').html(historyHtml);
		});
	} else {
		$('#invalid-question').modal('show');
	}
});