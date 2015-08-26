describe("Questions View", function() {

  beforeEach(function(){
    var view = newQuestionsView();
  });

  describe('allQuestionsSucess method', function() {
    view.allQuestionsSucess();
    it('appends the questionDiv to dbc_stack', function() {
      expect($('#dbc_stack').find('.question').toHaveLength(1);
    });
  });
})
