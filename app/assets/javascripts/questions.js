$(document).ready(function() {

  var questionsView = new QuestionsView();
  var questionView = new QuestionView();
  var appView = new AppView();
  var questionsModel = new QuestionsModel();
  var questionModel = new QuestionModel();
  var answersView = new AnswersView();
  var answerView = new AnswerView();
  var answersModel = new AnswersModel();
  var answerModel = new AnswerModel();

  questionView.newQuestionDiv();

  questionView.askQuestionButtonEventHandler();

  appView.authenticationErrorAlert();

  questionsModel.getAllQuestions(questionsView.allQuestions, questionsView.allQuestionsFailure);

  questionView.askQuestionSubmitEventHandler(questionModel.newQuestion);

  questionView.deleteQuestionEventHandler(questionModel.deleteQuestion);

  // $('#dbc_stack').on('click', '.delete-button', function(e) {
  //   e.preventDefault();
  //   var question = $(e.target).parent();
  //   var questionId = question.data('question-id');
  //   $.ajax({
  //     url: "/questions/"+questionId,
  //     type: "DELETE",
  //     success: function() {
  //       question.hide();
  //     },
  //     failure: function() {
  //       alert("Your request was not successful. Please try again.")
  //     }
  //   })
  // });

  answersView.allQuestionAnswersEventHandler(answersModel.getAllAnswers);

  answerView.newAnswerButtonEventHandler();

  answerView.newAnswerSubmitEventHandler(answerModel.addNewAnswer);

  $('#dbc_stack').on('click', '.answer-delete-button', function(e) {
    e.preventDefault();
    var question = $(e.target).parent().parent().parent().parent();
    var questionId = question.data('question-id');
    var answer = question.find('.question-answers');
    var answerId = answer.data('answer-id');
    $.ajax({
      url: "/questions/"+questionId+"/answers/"+answerId,
      type: "DELETE",
      success: function() {
        answer.hide();
      },
      failure: function() {
        alert("Your request was not successful. Please try again.")
      }
    })
  })

})

// $(document).ready(function() {

//   $.ajax({
//     url: "/questions",
//     type: "GET",
//     success: function(data) {
//       for(var i=0; i< data.length; i++) {
//         var question = data[i]
//         var questionId = question.id
//         var questionDiv =
//         '<div class="question" data-question-id="'+questionId+'">'+question.content+', '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<div class="new-answer"><a class="create-answer-button" href="">Answer this Question</a>'+'<form class="new-answer-form" method="post" action="/questions/'+questionId+'/answers"><input type="text" name="answer[content]" placeholder="Answer a Question"><input type="submit" value="Submit Answer"></form>'+' <a class="answers-button" href="">See Answers</a>'+'<div class="answers-go-here"></div>'+'</div>'
//         $('#dbc_stack').append(questionDiv);
//       }
//     },
//     failure: function() {
//       alert("Your request was not successful. Please try again.")
//     }
//   });

//   var newQuestionDiv = '<div class="new-question"><a class="ask-question-button" href="">Ask Question</a>'+'<form class="new-question-form" method="post" action="/questions"><input type="text" name="question[content]" placeholder="Ask a Question"><input type="submit" value="Submit Question"></form>'+'<div class="questions-go-here"></div>'+'</div>'
//   $('#ask_question').append(newQuestionDiv);

//   $('#ask_question').on('click', '.ask-question-button', function(e) {
//     e.preventDefault();
//     var question = $(e.target).parent();
//     var newQuestionForm = question.find('.new-question-form').show();
//   })

//   $('#ask_question').on('submit', '.new-question-form', function(e) {
//     e.preventDefault();
//     var question = $(e.target).parent();
//     var newQuestion = question.find('.questions-go-here');
//     $.ajax({
//       url: "/questions",
//       type: "POST",
//       data: $(e.target).serialize(),
//       success: function(data) {
//         var question = data.question
//         var questionId = question.id
//         var questionDiv = '<div class="question" data-question-id="'+questionId+'">'+question.content+', '+question.user_name+' <a class="delete-button" href="">Delete</a> '+'<a class="create-answer-button" href="">Answer this Question</a> '+'<form class="new-answer-form" method="post" action="/questions/"'+questionId+'"/answer"><input type="text" name="answer[content]" placeholder="Answer a Question"><input type="submit" value="Submit Answer"></form>'+'<a class="answers-button" href="">See Answers</a>'+'<div class="answers-go-here"></div>'+'</div>'
//         $('#dbc_stack').append(questionDiv);
//         alert("Success! Your question was added.");
//         $(e.target).find('input[type=text]').val("")
//       },
//       failure: function() {
//         alert("Your request was not successful. Please try again.")
//       }
//     })
//   })

//   $(document).ajaxError(function (e, xhr, settings) {
//         if (xhr.status == 401) {
//           alert("You need to sign in before you can complete this request.");
//           location.reload();
//         }
//     });


//   $('#dbc_stack').on('click', '.answers-button', function(e) {
//     e.preventDefault();
//     var question = $(e.target).parent().parent();
//     var questionId = question.data('question-id');
//     var answers = question.find('.answers-go-here');
//     $.ajax({
//       url: "/questions/"+questionId+"/answers",
//       type: "GET",
//       success: function(data) {
//         for(var i=0; i< data.length; i++) {
//           var answer = data[i];
//           var answerId = answer.id;
//           var answerDiv = '<div class="question-answers" data-answer-id="'+answerId+'">'+answer.content+', '+answer.user_name+' <a class="answer-delete-button" href="">Delete</a>'+'</div>'
//           answers.append(answerDiv);
//         }
//       },
//       failure: function() {
//         alert("Your request was not successful. Please try again.")
//       }
//     })
//   });

//   $('#dbc_stack').on('click', '.create-answer-button', function(e) {
//     e.preventDefault();
//     var question = $(e.target).parent();
//     var newAnswerForm = question.find('.new-answer-form').show();
//   })

//   $('#dbc_stack').on('submit', '.new-answer-form', function(e) {
//     e.preventDefault();
//     var question = $(e.target).parent().parent();
//     var questionId = question.data('question-id');
//     var newAnswer = question.find('.answers-go-here');
//     $.ajax({
//       url: "/questions/"+questionId+"/answers",
//       type: "POST",
//       data: $(e.target).serialize(),
//       success: function() {
//         alert("Success! Your question was added.");
//         $(e.target).find('input[type=text]').val("")
//       },
//       failure: function() {
//         alert("Your request was not successful. Please try again.")
//       }
//     })
//   });

//   $('#dbc_stack').on('click', '.answer-delete-button', function(e) {
//     e.preventDefault();
//     var question = $(e.target).parent().parent().parent().parent();
//     var questionId = question.data('question-id');
//     var answer = question.find('.question-answers');
//     var answerId = answer.data('answer-id');
//     $.ajax({
//       url: "/questions/"+questionId+"/answers/"+answerId,
//       type: "DELETE",
//       success: function() {
//         answer.hide();
//       },
//       failure: function() {
//         alert("Your request was not successful. Please try again.")
//       }
//     })
//   })

// })
