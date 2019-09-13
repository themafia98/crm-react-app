import React,{useEffect,useState,Fragment} from 'react';
import Loader from '../Loader/Loader';
import AJAX from '../../Utils/GetData';
import './modalWindow.scss';

const ModalContent = ({mode}) => {


    const [policyContent, setPolicy] = useState(false);
    const [failLoadData, setFailLoadData] = useState(false);
    const [isLoad, setLoad] = useState(false);

    const didMount = () => {
        setLoad(true);

        let address = 'http://localhost:3001/policy';
        if (process.env.NODE_ENV === 'production')
        address = process.env.REACT_APP_POLICY;

        AJAX.reset().send(address)
        .then(res => {
            if (res.statusSend && res.statusSend === 'wait')
                throw new Error ('Wait');
            if (res.ok) return res.text();
            else throw new Error ('Fail fetch');
        })
        .then(text => {
            setPolicy(text.split(/\\n/ig).map((item,index) => {
            return <p key = {index}>{item}</p>
            }));
            setLoad(false);
        })
        .catch(error => { 
            console.error(error.message);
            if (error.message === 'Fail fetch'){
                setLoad(false);
                setFailLoadData(true);
            }
    });
    }

    useEffect(didMount,[]);

    if (mode === 'policy'){
        return (
            <div className = 'Modal__policy'>
            <p className = 'Modal_policy__title'>
                Политика конфиденциальности персональных данных
            </p>
            {failLoadData && <p>Server is not responding</p>}
            {isLoad && <Loader loaderClass = 'Loader' />}
            {policyContent}
            </div>
        )
    } else return <Fragment></Fragment>
};
export default ModalContent;