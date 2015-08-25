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
      // var answerDiv = question.find('.answers-go-here');
      addNewAnswer(e, questionId, that.newAnswerSuccess, that.newAnswerError);
    });
  },

  newAnswerSuccess: function() {
    alert("Success! Your answer was added.");
    $('.new-answer-form').find('input[type=text]').val("");
    $('.answers-go-here').hide().show().fadeIn('fast');
  },

  newAnswerError: function() {
    alert("Your request was not successful. Please try again.");
  },

  deleteAnswerEventHandler: function(deleteAnswer) {
    var that = this;
    $('#dbc_stack').on('click', '.answer-delete-button', function(e) {
      e.preventDefault();
      var $element = $(e.target);
      var question = $element.parent().parent().parent().parent();
      var questionId = question.data('question-id');
      var answer = $element.parent();
      var answerId = answer.data('answer-id');
      deleteAnswer(questionId, answerId, answer, that.deleteAnswerSuccess, that.deleteAnswerError);
    });
  },

  deleteAnswerSuccess: function(answer) {
    answer.hide();
  },
  deleteAnswerError: function() {
    alert("You do not have permission to do that.");
  }
}
