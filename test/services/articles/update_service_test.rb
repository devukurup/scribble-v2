# frozen_string_literal: true

require "test_helper"

class Articles::UpdateServiceTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
  end

  def test_article_is_unpublished_on_an_unpublish_event
    article = create(
      :article, :with_schedule, status: :published, category: @category, user: @user, site: @site,
      event: :unpublish)
    Articles::UpdateService.new(article.schedule.id).process!

    assert article.reload.draft?
  end

  def test_article_is_published_on_a_publish_event
    article = create(
      :article, :with_schedule, status: :draft, category: @category, user: @user, site: @site,
      event: :publish)
    Articles::UpdateService.new(article.schedule.id).process!

    assert article.reload.published?
  end

  def test_deleted_schedule_id_does_not_raise_any_errors
    assert_nil Articles::UpdateService.new("invalid_id").process!
  end
end
