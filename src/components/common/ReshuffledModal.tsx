import React, { FormEventHandler, useState } from 'react';
import { MouseEventHandler } from 'react';
import { Button } from './Button';
import { Modal } from './modal';

interface ReshuffledModal {
    handleClose: MouseEventHandler;
}

export const ReshuffledModal = ({ handleClose }: ReshuffledModal) => {
    return (
        <Modal>
            <div className="flex flex-col place-items-center py-4 px-4 w-64">
                <div className="text-xl pb-4 flex flex-row flex-wrap">
                    <span>The deck was reshuffled</span>
                </div>

                <Button onClick={handleClose} width={36}>
                    Ok
                </Button>
            </div>
        </Modal>
    );
};
