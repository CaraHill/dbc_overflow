class ChangeUserIdIdColumnInQuestionsTableToUserId < ActiveRecord::Migration
  def change
    rename_column :questions, :user_id_id, :user_id
  end
end
