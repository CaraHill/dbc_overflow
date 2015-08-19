function AnswerView() {

}

AnswerView.prototype = {
  newAnswerButtonEventHandler: function() {
    $('#dbc_stack').on('click', '.create-answer-button', function(e) {
      e.preventDefault();
      var question = $(e.target).parent();
      question.find('.new-answer-form').show();
    });
  },

  newAnswerSubmitEventHandler: function(addNewAnswer) {
    var that = this;
    $('#dbc_stack').on('submit', '.new-answer-form', function(e) {
      e.preventDefault();
      var question = $(e.target).parent().parent();
      var questionId = question.data('question-id');
      question.find('.answers-go-here');
      addNewAnswer(e, questionId, that.newAnswerSuccess, that.newAnswerFailure);
    });
  },

  newAnswerSuccess: function() {
    alert("Success! Your answer was added.");
    $('.new-answer-form').find('input[type=text]').val("");
  },

  newAnswerFailure: function() {
    alert("Your request was not successful. Please try again.");
  }
}
