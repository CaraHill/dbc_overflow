require 'rails_helper'

RSpec.describe AnswersController, :type => :controller do

  describe "#create" do
    before do
      user = FactoryGirl.create(:user)
      sign_in(user)
      @question = Question.create(content: "This is a question", user_id: user.id)
      @answer_params = FactoryGirl.attributes_for(:answer, user_id: user.id, question_id: @question.id)
    end

    it "adds a new a answer to the database" do
      expect { post :create, :question_id => @question.id.to_s, :answer => @answer_params }.to change(Answer, :count).by(1)
    end

    it "renders an http status of 200 if successful" do
      expect(response).to have_http_status(200)
    end
  end
end
