# frozen_string_literal: true

module SampleData
  module LoadersList
    def loaders_list
      @_loaders_list ||= [
        SampleData::SiteService,
        SampleData::UserService,
        SampleData::CategoriesService,
        SampleData::ArticlesService
    ]
    end
  end
end
