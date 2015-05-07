require 'rails_helper'

RSpec.describe QuestionsController, :type => :controller do

  describe "#index" do

    describe "response" do
      it "responds successfully with an HTTP 200 status code" do
        get :index
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end

      it "renders the index template" do
        get :index
        expect(response).to render_template("index")
      end
    end

    it "assigns questions to an instance variable" do
      Question.create(content: "Hello!")
      get :index
      expect(assigns(:questions)).to eq(Question.all)
    end
  end

  describe "#show" do
    it "lists a specific question" do
      user = FactoryGirl.create(:user)
      question = Question.create(content: "Hello!", user_id: user.id)
      get :show, id: question.id
      expect(Question.last.id).to eq(question.id)
    end
  end

  describe "#create" do
    it "creates a question" do
      user = FactoryGirl.create(:user)
      sign_in(user)
      question_params = FactoryGirl.attributes_for(:question)
      expect { post :create, :question => question_params }.to change(Question, :count).by(1)
    end
  end

  describe "#remove" do
    it "deletes the question" do
      user = FactoryGirl.create(:user)
      sign_in(user)
      question = Question.create(content: "Hello!", user_id: user.id)
      delete :remove, id: question.id
      expect(Question.all).to_not include(question)
    end
  end

end