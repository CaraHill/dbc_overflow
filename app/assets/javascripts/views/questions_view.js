function QuestionsView () {}

QuestionsView.prototype = {

  allQuestions: function(data) {
    for(var i=0; i< data.length; i++) {
        var question = data[i]
        var questionId = question.id
        var questionDiv =
        '<div class="question" data-question-id="'+questionId+'">'+question.content+' - '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<div class="new-answer"><a class="create-answer-button" href="">Answer this Question</a>'+'<form class="new-answer-form" method="post" action="/questions/'+questionId+'/answers"><input type="text" name="answer[content]" placeholder="Answer a Question"><input type="submit" value="Submit Answer"></form>'+' <a class="answers-button" href="">See Answers</a>'+'<div class="answers-go-here"></div>'+'</div>'
        $('#dbc_stack').append(questionDiv);
      }
  },
  allQuestionsFailure: function() {
    alert("Your request was not successful. Please try again.")
  }
}
