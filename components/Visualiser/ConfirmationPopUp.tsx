import React from 'react';
import Modal from 'react-modal';

interface PopUpProps {
    isOpen: boolean;
    onClose: (confirmed: boolean) => void;
    elementsToDelete: string[];
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, elementsToDelete }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={() => onClose(false)}>
            <h2>Confirmation</h2>
            <p>Êtes-vous sûr de vouloir supprimer les éléments suivants ?</p>
            <ul>
                {elementsToDelete.map((element, index) => (
                    <li key={index}>{element}</li>
                ))}
            </ul>
            <button onClick={() => onClose(false)}>Annuler</button>
            <button onClick={() => onClose(true)}>Confirmer</button>
        </Modal>
    );
};

export default PopUp;
