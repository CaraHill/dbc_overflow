require 'rails_helper'

RSpec.describe Answer, type: :model do

  before do
    @answer = Answer.create(content: "Hello!")
  end

  it "creates an instance of answer" do
    expect(@answer).to be_instance_of(Answer)
  end

  describe "answer validity" do
    it "creates a valid answer" do
      expect(@answer).to be_valid
    end
  end
end
