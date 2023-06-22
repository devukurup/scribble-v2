# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :categories, only: %i[index create update]
    resources :articles, except: %i[new edit] do
      collection do
        patch :bulk_update
        delete :bulk_destroy
      end
    end
    resource :site, only: %i[show update]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
