import { useEffect, useRef, useState } from 'react';
import s from './Main.module.css';
import { useNavigate } from 'react-router-dom';
import {
    useMessageMutation,
    useSetMessageMutation,
    useDelMessageMutation,
    useCheckNumberMutation,
} from '../../services/apiWA';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, addChatList } from '../../store/messagesSlice';
import { clearSessionData, getSessionData } from '../../utils/utils';

const Main = () => {
    const [visibleFilter, setVisibleFilter] = useState(null);
    const navigate = useNavigate();
    const [useMessage] = useMessageMutation();
    const [setMessage] = useSetMessageMutation();
    const [delMessage] = useDelMessageMutation();
    const [error, setError] = useState('');
    const message = useRef(null);
    const chat = useRef(null);
    const dispatch = useDispatch();
    const { idInstance, apiTokenInstance } = getSessionData();
    const [checkNumber] = useCheckNumberMutation();

    const messages = useSelector((state) => state.messagesSl.messages);

    const chatList = useSelector((state) => state.messagesSl.chatList);

    useEffect(() => {
        setInterval(() => {
            setMessage({
                idInstance: idInstance,
                apiTokenInstance: apiTokenInstance,
            }).then((data) => {
                if (!data.data) {
                    return;
                } else {
                    if (
                        data.data.body.typeWebhook === 'incomingMessageReceived'
                    ) {
                        const typeMessage =
                            data.data?.body.messageData.typeMessage;

                        const chatIdMessage = data.data?.body.senderData.chatId;

                        if (typeMessage === 'textMessage') {
                            const textMessage =
                                data.data?.body.messageData.textMessageData
                                    .textMessage;

                            if (
                                chatIdMessage ===
                                chat.current.value + '@c.us'
                            ) {
                                dispatch(
                                    addMessage({
                                        mess: textMessage,
                                        my: false,
                                        id: data.data?.body.idMessage,
                                        chat: chat.current.value,
                                    })
                                );
                            }
                        }
                    }
                    delMessage({
                        idInstance: idInstance,
                        apiTokenInstance: apiTokenInstance,
                        idDel: data.data.receiptId,
                    });
                }
            });
        }, 6000);
    }, []);

    const toggleVisibleMenu = () => {
        setVisibleFilter(visibleFilter === false ? true : false);
    };

    const exit = () => {
        clearSessionData();
        navigate('/entry');
    };

    const sendMessage = () => {
        setError('');
        const dataForm = {
            chatId: chat.current.value + '@c.us',
            message: message.current.value,
        };

        const mess = message.current.value;
        checkNumber({
            idInstance: idInstance,
            apiTokenInstance: apiTokenInstance,
            body: { phoneNumber: chat.current.value },
        }).then((data) => {
            if (data.data?.existsWhatsapp) {
                useMessage({
                    idInstance: idInstance,
                    apiTokenInstance: apiTokenInstance,
                    body: dataForm,
                }).then((data) => {
                    if (!chatList.includes(chat.current.value)) {
                        dispatch(addChatList({ chat: chat.current.value }));
                    }
                    if (!data.data) {
                        return;
                    } else {
                        dispatch(
                            addMessage({
                                mess: mess,
                                my: true,
                                id: data.data.idMessage,
                                chat: chat.current.value,
                            })
                        );
                    }
                });

                message.current.value = '';
            } else {
                setError('Неверный формат номера телефона');
            }
        });
    };

    const selectChat = (e) => {
        chat.current.value = e.target.textContent;
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
                        <div className={s.main__listchat__error}>{error}</div>
                        {chatList.map((item, index) => (
                            <div
                                key={index}
                                className={s.main__listchat__item}
                                onClick={(event) => selectChat(event)}
                            >
                                <div
                                    className={s.main__listchat__item__logo}
                                ></div>
                                <div className={s.main__listchat__item__name}>
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={s.main__chat}>
                        <div className={s.main__chat__messages}>
                            {messages.map(
                                (item, index) =>
                                    item.chat === chat.current.value && (
                                        <div
                                            key={index}
                                            className={
                                                item.my
                                                    ? s.main__chat__messages__item__all__my
                                                    : s.main__chat__messages__item__all
                                            }
                                        >
                                            <div
                                                className={
                                                    item.my
                                                        ? s.main__chat__messages__item__my
                                                        : s.main__chat__messages__item
                                                }
                                            >
                                                {item.text}
                                            </div>
                                        </div>
                                    )
                            )}
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
