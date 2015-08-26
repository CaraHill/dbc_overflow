require 'rails_helper'

RSpec.describe Answer, type: :model do
  it "creates an instance of answer" do
    answer = Answer.new
    expect(answer).to be_instance_of(Answer)
  end

  describe "answer validity" do
    it "creates a valid answer" do
      answer = Answer.new(content: "Hello!")
      expect(answer).to be_valid
    end
  end
end
