require 'rails_helper'

RSpec.describe Question, type: :model do

  before do
    @question = Question.create(content: "This is a question?")
  end

  it "creates an instance of question" do
    expect(@question).to be_instance_of(Question)
  end

  describe "question validity" do
    it "creates a valid Question" do
      expect(@question).to be_valid
    end
  end
end
