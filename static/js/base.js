$('#question-form').submit(function(e) {
	e.preventDefault();
	let submittedQuestion = $.trim(this.question.value);
	this.reset();
	if(submittedQuestion.length > 1) {
		$.get('https://8ball.delegator.com/magic/JSON/' + submittedQuestion).done(function(data) {
			$('#answer').html(data.magic.answer);
		});
	} else {
		$('#missing-question').modal('show');
	}
});