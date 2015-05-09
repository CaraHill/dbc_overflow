$(document).ready(function() {

  $.ajax({
    url: "/questions",
    type: "GET",
    success: function(data) {
      for(var i=0; i< data.length; i++) {
        var question = data[i]
        var questionId = question.id
        var questionDiv = '<div class="question" data-question-id="'+questionId+'">'+question.content+', '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<a class="answers-button" href="">See Answers</a></div>'
        $('#dbc_stack').append(questionDiv);
      }
    },
    failure: function() {
      alert("We could not load the questions. Please try again later.s")
    }
  });

  var newQuestionDiv = '<div class="new-question"><a class="ask-question-button" href="">Ask Question</a></div>'
  $('#ask_question').append(newQuestionDiv);


})

