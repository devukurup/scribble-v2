import React, { useState } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import SidebarWrapper from "Dashboard/SidebarWrapper";
import {
  useShowArticle,
  useUpdateArticle,
} from "hooks/reactQuery/useArticlesApi";
import { findBy } from "neetocommons/pure";
import useArticlesStore from "stores/useArticlesStore";

import DeleteAlert from "./DeleteAlert";
import Form from "./Form";
import { ARTICLE_STATUSES, STATUS_DROPDOWN_MENU } from "./Form/constants";
import { formattedDateTime } from "./utils";
import Versions from "./Versions";
import VersionModal from "./Versions/Version";

const Edit = () => {
  const [isVersionsPaneOpen, setIsVersionsPaneOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState("");

  const { articleId } = useParams();
  const history = useHistory();

  const { setIsDeleteAlertOpen } = useArticlesStore.pick();

  const redirectToDashboard = () => {
    history.push(routes.articles.index);
  };

  const { mutate: updateArticle, isLoading: isUpdating } = useUpdateArticle({
    onSuccess: redirectToDashboard,
  });

  const { data: { article } = {}, isFetching } = useShowArticle({
    id: articleId,
    options: { refetchOnWindowFocus: false },
  });

  const handleSubmit = values => {
    const payload = {
      categoryId: values.category.value,
      title: values.title,
      body: values.body,
      status: values.status.value,
    };
    updateArticle({ id: articleId, payload });
  };

  const handleRestoreSuccess = () => {
    setIsRestoreModalOpen(false);
    setIsVersionsPaneOpen(false);
    redirectToDashboard();
  };

  const handleClose = () => {
    setIsDeleteAlertOpen(false);
    redirectToDashboard();
  };

  const handleRestore = id => {
    setIsRestoreModalOpen(true);
    setSelectedVersionId(id);
  };

  if (isFetching) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <SidebarWrapper>
      <Container>
        <Form
          isEdit
          handleDelete={() => setIsDeleteAlertOpen(true)}
          handleSubmit={handleSubmit}
          isSubmitting={isUpdating}
          setIsVersionsPaneOpen={setIsVersionsPaneOpen}
          dateString={formattedDateTime(
            article.status === ARTICLE_STATUSES.published
              ? article?.lastPublishedAt
              : article?.updatedAt
          )}
          initialStatus={findBy(
            { value: article.status },
            STATUS_DROPDOWN_MENU
          )}
          initialValues={{
            ...article,
            category: {
              label: article.category.title,
              value: article.category.id,
            },
          }}
          onClose={redirectToDashboard}
        />
        <DeleteAlert rowToBeDeleted={article} onClose={handleClose} />
        <Versions
          articleId={articleId}
          currentStatus={article.status}
          handleRestore={handleRestore}
          isOpen={isVersionsPaneOpen}
          title={article.title}
          onClose={() => setIsVersionsPaneOpen(false)}
        />
        <VersionModal
          articleId={articleId}
          handleRestoreSuccess={handleRestoreSuccess}
          id={selectedVersionId}
          isOpen={isRestoreModalOpen}
          title={article.title}
          onClose={() => setIsRestoreModalOpen(false)}
        />
      </Container>
    </SidebarWrapper>
  );
};

export default Edit;
