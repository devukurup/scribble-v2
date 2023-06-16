import React, { useState } from "react";

import EditCategory from "Dashboard/Categories/Edit";
import { useFetchCategories } from "hooks/useFetchCategories";
import { useUpdateCategories } from "hooks/useUpdateCategories";
import { Spinner } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Item from "./Item";

const List = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: categories, isLoading, refetch } = useFetchCategories();

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
              {categories.map(({ id, title }, index) => (
                <Draggable draggableId={id} index={index} key={id}>
                  {provided => (
                    <Item
                      provided={provided}
                      setIsEditModalOpen={setIsEditModalOpen}
                      title={title}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <EditCategory
        handleUpdate={updateCategory}
        isOpen={isEditModalOpen}
        refetch={refetch}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default List;
