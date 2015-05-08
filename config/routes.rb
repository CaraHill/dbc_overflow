Rails.application.routes.draw do

  root to: 'visitors#index'
  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users
  resources :questions, :except => :destroy
  delete '/questions/:id' => 'questions#remove', as: 'remove_question'
end
