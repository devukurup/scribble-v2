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
        {isLoading && <Spinner />}
        {!isLoading &&
          versions.map(version => (
            <Item
              handleRestore={handleRestore}
              key={version.id}
              version={version}
            />
          ))}
      </Pane.Body>
    </Pane>
  );
};

export default Versions;
