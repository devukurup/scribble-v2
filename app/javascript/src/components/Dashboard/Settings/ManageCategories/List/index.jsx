import React, { useState } from "react";

import { Spinner } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DeleteCategory from "Dashboard/Categories/Delete";
import EditCategory from "Dashboard/Categories/Edit";
import { useUpdateCategories } from "hooks/useUpdateCategories";

import Item from "./Item";

const List = ({ categories, isLoading, refetch, isSingleCategoryPresent }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState({});
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState({});

  const handleEdit = category => {
    setIsEditModalOpen(true);
    setCategoryToUpdate(category);
  };

  const handleDelete = category => {
    setIsDeleteModalOpen(true);
    setCategoryToBeDeleted(category);
  };

  const { update: updateCategory, isLoading: isUpdating } =
    useUpdateCategories();

  const handleDragEnd = ({ destination, draggableId }) => {
    if (!destination) return;

    const payload = { position: destination.index + 1 };
    updateCategory({
      id: draggableId,
      payload,
      onSuccess: refetch,
      quiet: true,
    });
  };

  if (isLoading || isUpdating) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {provided => (
            <div
              className="categories"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {categories.map((category, index) => {
                const { id } = category;

                return (
                  <Draggable draggableId={id} index={index} key={id}>
                    {(provided, snapshot) => (
                      <Item
                        category={category}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        isDragging={snapshot.isDragging}
                        isSingleCategoryPresent={isSingleCategoryPresent}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <EditCategory
        categoryToUpdate={categoryToUpdate}
        isOpen={isEditModalOpen}
        refetch={refetch}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeleteCategory
        categoryToBeDeleted={categoryToBeDeleted}
        isOpen={isDeleteModalOpen}
        isSingleCategoryPresent={isSingleCategoryPresent}
        refetch={refetch}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default List;
