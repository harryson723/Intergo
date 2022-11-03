import { useModal } from "../hooks/useModal";
import BussinesOptionCon from "./BussinesOptionsCon";
import Modal from "./Modal"

const BussinesState = ({b}) => {
    const [isOpen, openModal, closeModal] = useModal();
    return ( 
        <>
            <button onClick={openModal}>VER INFO</button>
           <Modal isOpen={isOpen} closeModal={closeModal}>
                <BussinesOptionCon b={b}/>
           </Modal>
        </>
     );
}
 
export default BussinesState;