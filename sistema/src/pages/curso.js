import React,{useEffect,useState,useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import {useHttpClient} from '../components/hooks/http-hook';

import ErrorModal from '../components/UIElements/modal/errormodal'

import Add from './icons/plus.png'
import './NovoCurso.css'
import './button.css'
import LoadingSpinner from '../components/UIElements/LoadingSpinner';

import CursoList from '../components/UIElements/cursos/cursoslist'

const Curso = props => {

    const history = useHistory();
    const [loadedCursos,setCursos]=useState(null);
    const {error,sendRequest,clearError,isLoading}=useHttpClient();

    const fetchCursos=useCallback(async ()=>{
        try{
            setCursos(null);
            const responseData= await sendRequest(
                'http://localhost:5000/api/curso/getcursos',
                'GET',
                null,
                {}
            )
            setCursos(responseData.cursos);
        }catch(err){

        }
    },[sendRequest])

    useEffect(()=>{
        fetchCursos();
    },[fetchCursos]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <LoadingSpinner classNameCenter/>}
            {!isLoading && loadedCursos && <CursoList reloadList={fetchCursos} items={loadedCursos}/>}
            {!isLoading &&<div className="button-div">
                <button type="button" onClick={() => history.push('/novocurso')} ><img className="button-cad" src={Add} alt="add-novo-curso" /></button>
            </div>}
        </React.Fragment>
    )
}

export default Curso;