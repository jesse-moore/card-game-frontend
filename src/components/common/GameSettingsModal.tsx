import React from 'react';
import { MouseEventHandler } from 'react';
import { Modal } from '../common/modal';
import { CloseButton } from '../form/CloseButton';

interface GameSettingsModal {
    handleClose: MouseEventHandler;
}

export const GameSettingsModal = ({ handleClose }: GameSettingsModal) => {
    return (
        <Modal>
            <div className="ml-auto w-min" onClick={handleClose}>
                <CloseButton />
            </div>
            <div className="px-4 py-4">Not implemented yet</div>
        </Modal>
    );
};
