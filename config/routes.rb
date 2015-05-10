Rails.application.routes.draw do

  root to: 'visitors#index'
  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, :except => :new_user_session
  get '/users/sign_in' => 'devise/sessions#new', :remote => true
  resources :questions, :except => :destroy
  delete '/questions/:id' => 'questions#remove', as: 'remove_question'
  get '/questions/:id/answers' => 'answers#show', as: 'question_answers'
  post '/questions/:id/answer' => 'answers#create', as: 'new_answer'
  delete 'questions/:id/answer' => 'answers#remove', as: 'remove_answer'
end
