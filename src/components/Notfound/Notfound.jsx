import s from './Notfound.module.css';

const Notfound = () => {
    return (
        <div className={s.main}>
            <div className={s.main__error}>404</div>
            <div className={s.main__error}>Not Found</div>
        </div>
    );
};

export default Notfound;
