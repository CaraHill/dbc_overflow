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

  var newQuestionDiv = '<div class="new-question"><a class="ask-question-button" href="">Ask Question</a>'+'<form class="new-question-form" method="post" action="/questions"><input type="text" name="question[content]" placeholder="Ask a Question"><input type="submit" value="Submit Question"></form>'+'<div class="questions-go-here"></div>'+'</div>'
  $('#ask_question').append(newQuestionDiv);

  $('#ask_question').on('click', '.ask-question-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parent();
    var newQuestionForm = question.find('.new-question-form').show();
  })

  $('#ask_question').on('submit', '.new-question-form', function(e) {
    e.preventDefault();
    var question = $(e.target).parent();
    var newQuestion = question.find('.questions-go-here');
    $.ajax({
      url: "/questions",
      type: "POST",
      data: $(e.target).serialize(),
      success: function(data) {
        var question = data.question
        var questionId = question.id
        var questionDiv = '<div class="question" data-question-id="'+questionId+'">'+question.content+', '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<a class="answers-button" href="">See Answers</a></div>'
        $('#dbc_stack').append(questionDiv);
        alert("Success! Your question was added.");
        $(e.target).find('input[type=text]').val("")
      },
      failure: function() {
        alert("Your question was not added. Please try again.")
      }
    })
  })
})

