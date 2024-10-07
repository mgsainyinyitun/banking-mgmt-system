'use client'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

interface AcceptModalProps{
    isOpen: boolean,
    onOpenChange: (s: boolean) => void,
    acceptBtn: string,
    title: string,
    description: string,
    onAccept: () => void,
}

const AcceptModal = ({ isOpen, onOpenChange, acceptBtn, title, description, onAccept }: AcceptModalProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={() => onOpenChange(false)} isDismissable={true} isKeyboardDismissDisabled={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <p>
                                {description}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={() => {
                                onAccept();
                                onClose();
                            }}>
                                {acceptBtn}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AcceptModal