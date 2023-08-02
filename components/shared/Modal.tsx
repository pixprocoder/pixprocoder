import { useRef } from "react";
import { TbBrandFiverr } from "react-icons/tb";
import { SiUpwork } from "react-icons/si";
import Link from "next/link";

function HireMeModalPage({ showModal, closeModal }: any) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <>
      {/* Open the modal by calling the openModal function */}

      <dialog
        id="my_modal_5"
        className={`modal  ${showModal ? "modal-open" : "modal-closed"}`}
        ref={modalRef}
      >
        <form method="dialog" className="modal-box bg-[#101630]">
          <h3 className="font-bold text-lg">Hii There!!</h3>
          <div className="py-4">
            <p className="my-2">What do you want? let's discuss</p>

            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered input-accent w-full "
            />

            <textarea
              name="message"
              className="textarea textarea-info w-full my-2"
              placeholder="Message"
            />
            <div>
              <p className="text-sm text-green-600 my-2">For Freelance Work</p>
              <div className=" flex gap-4 text-2xl  items-center">
                <Link
                  className="text-green-500 hover:text-blue-600"
                  href="https://www.fiverr.com/pixprocoder"
                >
                  <TbBrandFiverr></TbBrandFiverr>
                </Link>
                <Link
                  className="text-green-500 hover:text-blue-600"
                  href="https://www.fiverr.com/pixprocoder"
                >
                  <SiUpwork></SiUpwork>
                </Link>
              </div>
            </div>
          </div>
          <div className="modal-action">
            {/* Close the modal by calling the closeModal function */}
            <button
              className="px-3 py-2 bg-red-600 rounded-md text-xl"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-3 py-2 bg-blue-600 rounded-md text-xl"
            >
              Send
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
export default HireMeModalPage;
