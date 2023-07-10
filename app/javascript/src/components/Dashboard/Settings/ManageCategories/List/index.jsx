import React, { useState } from "react";

import { Spinner } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DeleteCategory from "Dashboard/Categories/Delete";
import EditCategory from "Dashboard/Categories/Edit";
import { useUpdateCategory } from "hooks/reactQuery/useCategoriesApi";

import Item from "./Item";

const List = ({ categories, isLoading, isSingleCategoryPresent }) => {
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

  const { mutate: updateCategory, isLoading: isUpdating } = useUpdateCategory();

  const handleDragEnd = ({ destination, draggableId }) => {
    if (!destination) return;

    const payload = { position: destination.index + 1 };
    updateCategory({
      id: draggableId,
      payload,
      isQuiet: true,
    });
  };
  if (isLoading || isUpdating) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto px-8">
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
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeleteCategory
        categoryToBeDeleted={categoryToBeDeleted}
        isOpen={isDeleteModalOpen}
        isSingleCategoryPresent={isSingleCategoryPresent}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default List;
