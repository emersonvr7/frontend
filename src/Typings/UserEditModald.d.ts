export interface UserEditModalProps {
    open: boolean,
    onClose: () => void,
    userId?: string,
    onUserUpdated: () => void; // Callback después de la actualización
}