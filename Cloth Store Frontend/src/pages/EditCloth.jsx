import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditClothes = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:4000/clothes/${id}`)
            .then((res) => {
                setName(res.data.name);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

    }, [])

    const handleEditCloth = () => {
        const data = {
            name,
            price,
            description,
        };
        setLoading(true);
        axios
            .put(`http://localhost:4000/clothes/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please Chack console');
                alert('Error', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Cloth</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>price</label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Description</label>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditCloth}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditClothes 