require 'rails_helper'

RSpec.describe QuestionsController, :type => :controller do

  describe "#index" do

    describe "response" do
      it "responds successfully with an HTTP 200 status code" do
        get :index
        expect(response).to be_success
        expect(response).to have_http_status(200)
      end
    end

    before do
      @user = FactoryGirl.create(:user)
      @question = Question.create(content: "Hello!", user_id: @user.id)
      get :index
    end

    it "returns at least one question" do
      json_result = parse_json(response.body)
      expect(json_result.length).to eq(1)
    end

    it "returns the correct user_name for the first question" do
      json_result = parse_json(response.body).first
      expect(json_result["user_name"]).to eq("Test User")
    end

    it "returns the correct content for the first question" do
      json_result = parse_json(response.body).first
      expect(json_result["content"]).to eq("Hello!")
    end
  end

  describe "#show" do

    before do
      @user = FactoryGirl.create(:user)
      @question = Question.create(content: "Is this a question?", user_id: @user.id)
      @answer = Answer.create(content: "Yes it is!", user_id: @user.id, question_id: @question.id)
      get :show, id: @question.id
    end

    it "returns the correct question" do
      json_result = parse_json(response.body)
      expect(json_result["question"]["content"]).to eq(@question.content)
    end

    it "returns the correct answer" do
      json_result = parse_json(response.body)
      expect(json_result["answer"][0]["content"]).to eq(@answer.content)
    end

    it "renders an http status of 200 if successful" do
      expect(response).to have_http_status(200)
    end

  end

  describe "#create" do

    before do
      user = FactoryGirl.create(:user)
      sign_in(user)
      @question_params = FactoryGirl.attributes_for(:question)
    end

    it "adds a new a question to the database" do
      expect { post :create, :question => @question_params }.to change(Question, :count).by(1)
    end

    it "renders an http status of 200 if successful" do
      expect(response).to have_http_status(200)
    end
  end

  describe "#remove" do

    before do
      user = FactoryGirl.create(:user)
      sign_in(user)
      @question = Question.create(content: "Hello!", user_id: user.id)
      @answer = Answer.create(content: "Goodbye!", question_id: @question.id, user_id: user.id)
      delete :remove, id: @question.id
    end

    it "deletes the question" do
      expect(Question.all).to_not include(@question)
    end

    it "deletes the question's answer" do
      expect(Answer.all).to_not include(@answer)
    end

    it "renders an http status of 200 if successful" do
      expect(response).to have_http_status(200)
    end
  end

end
