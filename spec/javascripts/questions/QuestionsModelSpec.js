describe("Questions Model", function() {
  var model;

  beforeEach(function() {
    model = new QuestionsModel();
  });

  describe("getAllQuestions", function() {
    beforeEach(function() {
      spyOn(allQuestionsSuccess, 'data').and.callThrough();
      Promise.prototype.success = function(callback) {
        callback('hello');
      };

      spyOn($, 'ajax').and.callFake(function() {
        return Promise.resolve();
      });
      model.getAllQuestions(data);
    });

    it("should call ajax with the correct params", function() {
      expect($.ajax).toHaveBeenCalledWith({
        url: '/questions',
        type: 'GET'
      });
    });

    it("should trigger allQuestionsSuccess", function() {
      expect(allQuestionsSuccess).toHaveBeenCalledWith('hello');
    })
  });

});
