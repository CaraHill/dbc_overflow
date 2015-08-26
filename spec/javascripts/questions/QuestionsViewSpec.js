describe("Questions View", function() {
  var view;

  beforeEach(function(){
    view = new QuestionsView();

  });

  describe('allQuestionsSuccess method', function() {

    it('appends the questionDiv to dbc_stack', function() {
      expect($('#dbc_stack').find('.question')).toHaveLength(1);
    });
  });
})
