import React from "react";

import { Pane, Spinner } from "neetoui";

import { useFetchVersions } from "hooks/reactQuery/articles/useVersionsApi";

import Header from "./Header";
import Item from "./Item";

const Versions = ({ isOpen, onClose, title, articleId, handleRestore }) => {
  const { data: { versions } = {}, isLoading } = useFetchVersions({
    articleId,
  });

  return (
    <Pane isOpen={isOpen} onClose={onClose}>
      <Pane.Header>
        <Header title={title} />
      </Pane.Header>
      <Pane.Body className="flex flex-col space-y-2">
        {isLoading ? (
          <Spinner />
        ) : (
          versions.map((version, index) => (
            <Item
              handleRestore={handleRestore}
              isCreated={index === versions.length - 1}
              isRecent={index === 0}
              key={version.id}
              version={version}
            />
          ))
        )}
      </Pane.Body>
    </Pane>
  );
};

export default Versions;
