import { useRef } from 'react';
import s from './Entry.module.css';
import {
    /* useEntryMutation, */ useAccountStatusMutation,
} from '../../serice/apiWA';
import { useNavigate } from 'react-router-dom';

const Entry = () => {
    console.log('entry');
    const instance = useRef(null);
    const tokenInstance = useRef(null);

    const [accauntStatus] = useAccountStatusMutation();
    const navigate = useNavigate();

    const sendIdInstance = (event) => {
        event.preventDefault();
        //console.log('send');
        //console.log(instance.current.value);
        //console.log(tokenInstance.current.value);

        const idInstance = instance.current.value;
        const apiTokenInstance = tokenInstance.current.value;

        console.log(idInstance + '+' + apiTokenInstance);

        if (idInstance.length > 0 && apiTokenInstance.length > 0) {
            accauntStatus({
                idInstance: idInstance,
                apiTokenInstance: apiTokenInstance,
            }).then((data) => {
                console.log(data);
                console.log(data.data.stateInstance);
                if (data.data.stateInstance === 'authorized') {
                    localStorage.setItem('idInstance', idInstance);
                    localStorage.setItem('apiTokenInstance', apiTokenInstance);
                    navigate('/');
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
                    <div className={s.main__button}>
                        <button className={s.main__button__item}>Войти</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Entry;
