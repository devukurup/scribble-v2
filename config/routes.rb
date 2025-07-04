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
            resources :analytics, only: :index, module: :articles do
              collection do
                post :generate_pdf
                get :download_pdf
              end
            end
          end

          resources :versions, only: %i[index show], module: :articles do
            patch :restore, on: :member
          end
          resource :schedule, only: %i[show create destroy], module: :articles
        end
        resource :site, only: %i[show update]
        resources :redirections, except: %i[new edit show]

        namespace :public do
          resource :session, only: :create
          resources :categories, only: :index
          resources :articles, only: :show, param: :slug do
            get :search, on: :collection
          end
        end
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
