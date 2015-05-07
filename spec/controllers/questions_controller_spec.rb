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

  # describe "#create" do
  #   it "creates a new question" do
  #     user = FactoryGirl.create(:user)
  #     sign_in(user)
  #     expect {
  #     post :create, {'question' => {content: "Hello!"}
  #     }}.to eq(Question.last)
  #   end
  # end

  # describe "#remove_from_cart" do
  #   it "removes the item from the cart" do
  #     product = Product.create(name: "robot", image: "image",price: 2000, description: "old robot")
  #     post :remove_from_cart, id: product.id
  #     expect(Order.all).to_not include(Order.where(product_id: product.id))
  #   end
  # end

end