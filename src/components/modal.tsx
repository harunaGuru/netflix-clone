import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { position } from "./movie-card";


type ModalProp = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  // closeModal: () => void;
  title: string;
  children: React.ReactElement;
  closeModal?: () => void;
  value?: position | null;
};

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  closeModal,
  value,
}: ModalProp) {
  const panelRef = useRef<HTMLDivElement>(null);

  function onMouseLeave(){
    if(closeModal){
      closeModal
    }
  }
  return (
    <section>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterEnter={() =>
              panelRef.current?.addEventListener("mouseleave", onMouseLeave)
            }
            beforeLeave={() =>
              panelRef.current?.removeEventListener("mouseleave", onMouseLeave)
            }
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  ref={panelRef}
                  style={value ? { position: "fixed", ...value } : {}}
                  className=" transform bg-dark text-white overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}
