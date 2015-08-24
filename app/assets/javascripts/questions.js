$(document).ready(function() {

  var questionsView = new QuestionsView();
  var questionView = new QuestionView();
  var appView = new AppView();
  var questionsModel = new QuestionsModel();
  var questionModel = new QuestionModel();
  var answerView = new AnswerView();
  var answerModel = new AnswerModel();

  questionView.newQuestionDiv();

  questionView.askQuestionButtonEventHandler();

  appView.authenticationErrorAlert();

  questionsModel.getAllQuestions(questionsView.allQuestionsSuccess, questionsView.allQuestionsError);

  // questionView.showQuestionEventHandler(questionModel.showQuestion, questionsView.allQuestionsDiv);

  $('#dbc_stack').on('click', '.show-question', function(e) {
    e.preventDefault();
    var question = $(e.target).parent();
    var questionId = question.data('question-id');
    $.ajax({
      url: "/questions/"+questionId,
      type: "GET",
      success: function(data) {
        var question = data.question;
        var questionId = question.id
        var questionDiv = '<div class="question" data-question-id="'+questionId+'">'+question.content+' - '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<div class="new-answer"><a class="create-answer-button" href="">Answer this Question</a>'+'<form class="new-answer-form" method="post" action="/questions/'+questionId+'/answers"><input type="text" name="answer[content]" placeholder="Answer a Question"><input type="submit" value="Submit Answer"></form>'+'<div class="answers-go-here"></div>'+'</div>'
        $('#dbc_stack').empty();
        $('#dbc_stack').append(questionDiv);
        var answersDiv = $('#dbc_stack').find('.answers-go-here');
        var answers = data.answer
        for(var i=0; i< answers.length; i++) {
          var answer = answers[i];
          var answerId = answer.id;
          var answerDiv = '<div class="question-answers" data-answer-id="'+answerId+'">'+answer.content+' - '+answer.user_name+' <a class="answer-delete-button" href="">Delete</a>'+'</div>'
          answersDiv.append(answerDiv);
        }
        questionView.hideQuestionDiv();
        questionsView.allQuestionsDiv();
      },
      error: function() {
        alert("Your request was not successful. Please try again.");
      }
    });
  });

  questionView.askQuestionSubmitEventHandler(questionModel.newQuestion);

  questionView.deleteQuestionEventHandler(questionModel.deleteQuestion);

  answerView.newAnswerButtonEventHandler();

  answerView.newAnswerSubmitEventHandler(answerModel.addNewAnswer);

  answerView.deleteAnswerEventHandler(answerModel.deleteAnswer);

})
