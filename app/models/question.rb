class Question < ActiveRecord::Base
  belongs_to :user

  def as_json(options = {})
    {
      content: content,
      user_name: user.name
    }
  end
end
