import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteCloth = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();


    const handleDeleteCloth = () => {
        setLoading(true);
        axios
            .delete(`https://cloth-store-repo-backend.onrender.com/clothes/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Cloth Deleted successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('An error happened. Please Check console', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Cloth</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are You Sure You want to delete this Cloth?</h3>

                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleDeleteCloth}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    )
}

export default DeleteCloth;