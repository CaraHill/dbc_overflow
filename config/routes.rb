Rails.application.routes.draw do

  root to: 'visitors#index'
  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, :except => :new_user_session
  get '/users/sign_in' => 'devise/sessions#new', :remote => true
  resources :questions, :except => :destroy
  delete '/questions/:id' => 'questions#remove', as: 'remove_question'
end
