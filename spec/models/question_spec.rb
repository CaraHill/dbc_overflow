require 'rails_helper'


RSpec.describe Question, type: :model do

  it "creates an instance of question" do
    question = Question.new
    expect(question).to be_instance_of(Question)
  end

  describe "question validity" do
    it "create a valid Question" do
      question = Question.new(content: "Hello!")
      expect(question).to be_valid
    end
  end
end
