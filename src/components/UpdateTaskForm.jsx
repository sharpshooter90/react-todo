import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const UpdateTaskForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);
  console.log("incoming", editedTask);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("updated Task Name", updatedTaskName);
    updateTask({ ...editedTask, name: updatedTaskName });
  };
  function closeModal() {
    setIsOpen(false);

    closeEditMode();
  }

  function openModal() {
    setIsOpen(true);
    console.log("open modal");
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <form className="w-full" onSubmit={handleFormSubmit}>
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-2 flex items-center justify-between sm:flex-nowrap">
                          <div className="ml-4 mt-2 w-full">
                            <input
                              type="text"
                              name="task"
                              id="task"
                              className="block w-full p-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter new task"
                              onInput={(e) =>
                                setUpdatedTaskName(e.target.value)
                              }
                              required
                              autoFocus
                              maxLength={80}
                              value={updatedTaskName}
                            />
                          </div>
                          <div className="ml-4 mt-2 flex-shrink-0">
                            <button
                              type="submit"
                              aria-label="Add Task"
                              className="relative inline-flex items-center rounded-md bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default UpdateTaskForm;
