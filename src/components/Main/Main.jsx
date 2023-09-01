import { useRef, useState } from 'react';
import s from './Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useMessageMutation } from '../../serice/apiWA';

const Main = () => {
    const [visibleFilter, setVisibleFilter] = useState(null);
    const navigate = useNavigate();
    const [useMessage] = useMessageMutation();
    const message = useRef(null);
    const chat = useRef(null);

    const messages = [];

    const toggleVisibleMenu = () => {
        setVisibleFilter(visibleFilter === false ? true : false);
    };

    const exit = () => {
        localStorage.setItem('idInstance', '');
        localStorage.setItem('apiTokenInstance', '');
        navigate('/entry');
    };

    const sendMessage = () => {
        console.log(message);
        console.log(chat);

        const dataForm = {
            chatId: '79053601281@c.us',
            message: message.current.value,
        };
        console.log(dataForm);

        const idInstance = localStorage.getItem('idInstance');
        const apiTokenInstance = localStorage.getItem('apiTokenInstance');
        console.log(apiTokenInstance + '+' + idInstance);

        useMessage({
            idInstance: idInstance,
            apiTokenInstance: apiTokenInstance,
            body: dataForm,
        });
        messages.push({ message: message.current.value, my: true });
        console.log(messages);
        message.current.value = '';
        messages.map((item) => console.log(item));
    };

    return (
        <div className={s.main}>
            <div className={s.main__header}>
                <div className={s.main__center}>
                    <div className={s.main__listchat}>
                        <div className={s.main__listchat__header}>
                            <svg
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                preserveAspectRatio="xMidYMid meet"
                                className={s.main__listchat__header__points}
                                version="1.1"
                                x="0px"
                                y="0px"
                                enableBackground="new 0 0 24 24"
                                xmlSpace="preserve"
                                onClick={() => toggleVisibleMenu()}
                            >
                                <path
                                    fill="currentColor"
                                    d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
                                ></path>
                            </svg>
                            {visibleFilter && (
                                <div
                                    className={s.main__listchat__menu}
                                    onClick={exit}
                                >
                                    Выйти
                                </div>
                            )}
                        </div>

                        <div className={s.main__listchat__addchat}>
                            <input
                                ref={chat}
                                type="text"
                                className={s.main__listchat__addchat__input}
                            />
                            <svg
                                viewBox="0 0 24 24"
                                height="20"
                                width="20"
                                preserveAspectRatio="xMidYMid meet"
                                className={s.main__listchat__addchat__button}
                                version="1.1"
                                x="0px"
                                y="0px"
                                enableBackground="new 0 0 24 24"
                                xmlSpace="preserve"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className={s.main__chat}>
                        <div className={s.main__chat__messages}>
                            {messages.map((item, index) => (
                                <div
                                    key={index}
                                    className={
                                        s.main__chat__messages__item__all
                                    }
                                >
                                    <div
                                        className={s.main__chat__messages__item}
                                    >
                                        {item.message}
                                    </div>
                                </div>
                            ))}
                            <div className={s.main__chat__messages__item__all}>
                                <div className={s.main__chat__messages__item}>
                                    sdfsdf55
                                </div>
                            </div>
                            <div
                                className={
                                    s.main__chat__messages__item__all__my
                                }
                            >
                                <div
                                    className={s.main__chat__messages__item__my}
                                >
                                    sdfsdf444444444444444
                                </div>
                            </div>

                            <div className={s.main__chat__messages__item__all}>
                                <div className={s.main__chat__messages__item}>
                                    sdfsdf55
                                </div>
                            </div>
                            <div
                                className={
                                    s.main__chat__messages__item__all__my
                                }
                            >
                                <div
                                    className={s.main__chat__messages__item__my}
                                >
                                    sdfsdf444444444444444
                                </div>
                            </div>
                        </div>
                        <div className={s.main__chat__input}>
                            <input
                                ref={message}
                                type="text"
                                className={s.main__chat__input__item}
                            />
                            <svg
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                preserveAspectRatio="xMidYMid meet"
                                className={s.main__chat__button}
                                version="1.1"
                                x="0px"
                                y="0px"
                                enableBackground="new 0 0 24 24"
                                xmlSpace="preserve"
                                onClick={sendMessage}
                            >
                                <path
                                    fill="currentColor"
                                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Main;
