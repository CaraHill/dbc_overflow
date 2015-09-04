class RegistrationsController < Devise::RegistrationsController
  before_action :sign_up_params, only: [:create]
  before_action :account_update_params, only: [:update]

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
