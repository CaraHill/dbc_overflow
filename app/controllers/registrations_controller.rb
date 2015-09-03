class RegistrationsController < Devise::RegistrationsController

  # FYI before_filter was renamed to before_action in rails4 for no apparent
  # good reason. Either will work but probably best to use *_action as *_filter
  # might go way in some future version of rails
  #
  before_filter :sign_up_params, only: [:create]
  before_filter :account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   session[:referrer] = request.referrer
  #   super
  # end

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password)
  end
end
