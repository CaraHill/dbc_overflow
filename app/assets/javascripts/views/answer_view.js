function AnswerView() {

}

AnswerView.prototype = {
  newAnswerButtonEventHandler: function() {
    $('#dbc_stack').on('click', '.create-answer-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parent();
    question.find('.new-answer-form').show();
  })
  }
}
