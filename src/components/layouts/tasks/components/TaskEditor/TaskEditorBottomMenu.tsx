import { ArrowSmallLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import deleteTask from "@/lib/sdk/methods/delete-task";
import useTaskList from "../../hooks/useTaskList";

export default function TaskEditorBottomMenu() {
  const { taskInEdit, closeTaskEditor, listType, mutate } = React.useContext(TasksLayoutContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function onRemoveTask() {
    setIsDeleting(true);
    try {
      if (taskInEdit?.id) await deleteTask(taskInEdit?.id);
      mutate((tasks) => tasks?.filter((task) => task.id !== taskInEdit?.id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      onClose();
      closeTaskEditor();
    }
  }

  return (
    <>
      <div className="flex justify-between px-6 py-4 border-t border-divider">
        <ArrowSmallLeftIcon onClick={closeTaskEditor} className="h-5 w-5 cursor-pointer group-hover:stroke-primary" />
        <TrashIcon onClick={onOpen} className="h-5 w-5 cursor-pointer" />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent className="p-4">
          {" "}
          <ModalHeader className="font-medium">
            <div>&ldquo;{taskInEdit?.title ?? "This IS a Title"}&rdquo; will be permanently deleted.</div>
          </ModalHeader>
          <ModalBody>
            <p className="text-danger-400">You won&apos;t be able to undo this action</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} radius="sm">
              Cancel
            </Button>{" "}
            <Button isLoading={isDeleting} onClick={onRemoveTask} radius="sm" color="danger">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
