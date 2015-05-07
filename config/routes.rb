Rails.application.routes.draw do
  root to: 'questions#index'


  post '/questions' => 'questions#new_question', as: 'new_question'
  get '/questions/:id' => 'questions#question', as: 'question'
  devise_for :users
  resources :users
end
