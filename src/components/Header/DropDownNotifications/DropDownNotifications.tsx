import { useState } from "react";
import styles from "./DropDownNotifications.module.css";
import DropdownMenu from "react-dropdown-menu";
import { INotifications } from "../types";


const DropDownNotifications: React.FC<{ dataInvites: INotifications }> = ({
  dataInvites,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div>
      <button onClick={handleOpen}>
        <span className="material-icons">notifications</span>
        {dataInvites.length > 0 && <span>{dataInvites}</span>}
      </button>
      <DropdownMenu isOpen={isOpen} onClose={handleClose}>
        {dataInvites.map((invite) => (
          <div key={invite.id}>
            <p>
              <b>{invite.senderName}</b> приглашает вас в команду
              <b>{invite.teamName}</b>
            </p>
            <button
              onClick={() => {
                // Обработка приглашения
              }}
            >
              Принять
            </button>
            <button
              onClick={() => {
                // Обработка приглашения
              }}
            >
              Отклонить
            </button>
          </div>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default DropDownNotifications;
