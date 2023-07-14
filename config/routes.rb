# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      constraints(lambda { |req| req.format == :json }) do
        resources :categories, only: %i[index create update destroy]
        resources :articles, except: %i[new edit] do
          collection do
            patch :bulk_update
            delete :bulk_destroy
          end

          resources :versions, only: %i[index show], module: :articles do
            patch :restore, on: :member
          end
        end
        resource :site, only: %i[show update]
        resources :redirections, except: %i[new edit show]

        namespace :public do
          resource :session, only: :create
          resources :categories, only: :index
          resources :articles, only: :show, param: :slug
        end
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
