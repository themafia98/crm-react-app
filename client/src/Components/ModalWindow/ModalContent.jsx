import React,{useEffect,useState,Fragment} from 'react';
import Loader from '../Loader/Loader';
import isFetch from 'isomorphic-fetch';
import './modalWindow.scss';

const upload = multer(); // form-data

const ModalContent = ({mode}) => {


    const [policyContent, setPolicy] = useState(false);
    const [isLoad, setLoad] = useState(false);

    const didMount = () => {
        setLoad(true);

        let adress = 'http://localhost:3001/policy';
        if (process.env.NODE_ENV === 'production')
        adress = process.env.REACT_APP_POLICY;

        isFetch(adress)
        .then(res => res.text())
        .then(text => {
            setPolicy(text.split(/\\n/ig).map((item,index) => {
            return <p key = {index}>{item}</p>
            }));
            setLoad(false);
        });
    }

    useEffect(didMount,[]);

    if (mode === 'policy'){
        return (
            <div className = 'Modal__policy'>
            <p className = 'Modal_policy__title'>
                Политика конфиденциальности персональных данных
            </p>
            {isLoad && <Loader loaderClass = 'Loader' />}
            {policyContent}
            </div>
        )
    } else return <Fragment></Fragment>
};
export default ModalContent;