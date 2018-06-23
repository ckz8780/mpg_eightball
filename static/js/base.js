"use strict";

/** Returns a class name given a response type */
function getCssClass(resType) {
	switch(resType) {
		case "Contrary":
			return "text-danger";
		case "Affirmative":
			return "text-success";
	}
	return "text-secondary";
}

/** Restore response history from localStorage if it exists */
function restoreHistoryIfExists(user) {
	let userHistoryObj = JSON.parse(localStorage.getItem(`userHistory_${user}`));
	if(userHistoryObj) {
		$("#clear-history-button").fadeToggle();
		$("#response-history-tbody").html(userHistoryObj.historyHtml);
	}
}

/** Store response history in localStorage */
function storeHistory(user, historyHtml) {
	let userHistory = {
		"username": user,
		"historyHtml": historyHtml
	};
	localStorage.setItem(`userHistory_${user}`, JSON.stringify(userHistory));
	$("#clear-history-button").fadeIn();
}

/** Handle yes/no question form submission */
$("#question-form").submit(function(e) {
	e.preventDefault();

	let submittedQuestion = $.trim(this.question.value.replace(/\?/g, ""));
	let currentUser = $.trim(this.currentUser.value);
	
	if(submittedQuestion.length > 1) {
		let uri = "https://8ball.delegator.com/magic/JSON/" + encodeURIComponent(submittedQuestion);
		this.reset();
	
		$.get(uri).done(function(data) {
			$("#answer").hide().html(`${data.magic.answer}.`).fadeIn();

			let numRows = $("#response-history-tbody tr").length;
			let historyHtml = $("#response-history-tbody").html();
			
			if(numRows >= 3) {
				$("#response-history-tbody tr:eq(0)").fadeOut().remove();
				historyHtml = $("#response-history-tbody").html();
			}

			let resType = data.magic.type;
			historyHtml += `<tr><td><strong class="${getCssClass(resType)}">${resType}</strong></td></tr>`;
			
			$("#response-history-tbody").html(historyHtml);
			storeHistory(currentUser, historyHtml);
		});

	} else {
		$("#invalid-question").modal("show");
	}
});

/** Smooth Nav Menu Transitions */
$(".dropdown").on("show.bs.dropdown", function() {
    $(this).find(".dropdown-menu").first().stop(true, true).slideDown(50);
});

$(".dropdown").on("hide.bs.dropdown", function() {
    $(this).find(".dropdown-menu").first().stop(true, true).slideUp(50);
});

/** Find the current user"s local response history and dump it */
$("#clear-history-button").click(function() {
	let currentUser = $("#currentUser").attr("value");
	localStorage.removeItem(`userHistory_${currentUser}`);
	$("#response-history-tbody").html("");
	$(this).toggle();
});