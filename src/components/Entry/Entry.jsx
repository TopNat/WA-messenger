import { useRef, useState } from 'react';
import s from './Entry.module.css';
import { useAccountStatusMutation } from '../../services/apiWA';
import { useNavigate } from 'react-router-dom';
import { setSessionData } from '../../utils/utils';

const Entry = () => {
    const instance = useRef(null);
    const tokenInstance = useRef(null);
    const [error, setError] = useState('');

    const [accauntStatus] = useAccountStatusMutation();

    const navigate = useNavigate();

    const sendIdInstance = (event) => {
        event.preventDefault();

        const idInstance = instance.current.value;
        const apiTokenInstance = tokenInstance.current.value;

        if (idInstance.length > 0 && apiTokenInstance.length > 0) {
            accauntStatus({
                idInstance: idInstance,
                apiTokenInstance: apiTokenInstance,
            }).then((data) => {
                if (data.data?.stateInstance) {
                    if (data.data.stateInstance === 'authorized') {
                        setSessionData({ idInstance, apiTokenInstance });
                        navigate('/');
                    } else {
                        setError(
                            'Проблема с авторизацией, проверьте корректность указания apiTokenInstance, partnerToken'
                        );
                    }
                } else {
                    setError(
                        'Проблема с авторизацией, проверьте корректность указания apiTokenInstance, partnerToken'
                    );
                }
            });
        }
    };

    return (
        <div className={s.main}>
            <form
                id="formIdInstance"
                onSubmit={(event) => {
                    sendIdInstance(event);
                }}
            >
                <div className={s.main__all}>
                    <div className={s.main__entry}>
                        <div className={s.main__entry__text}>idInstance </div>
                        <div>
                            <input
                                ref={instance}
                                className={s.main__entry__input}
                                type="text"
                                placeholder="idInstance"
                            />
                        </div>
                    </div>
                    <div className={s.main__entry}>
                        <div className={s.main__entry__text}>
                            apiTokenInstance
                        </div>
                        <div>
                            <input
                                ref={tokenInstance}
                                className={s.main__entry__input}
                                type="text"
                                placeholder="apiTokenInstance"
                            />
                        </div>
                    </div>
                    {error !== '' && (
                        <div>
                            <div className={s.main__error}>{error}</div>
                        </div>
                    )}
                    <div className={s.main__button}>
                        <button className={s.main__button__item}>Войти</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Entry;
