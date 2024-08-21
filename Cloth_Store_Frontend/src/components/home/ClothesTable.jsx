import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ClothesTable = ({ clothes }) => {
    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>No.</th>
                    <th className='border border-slate-600 rounded-md'>Title</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>
                        Name
                    </th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>
                        Cost
                    </th>
                    <th className='border border-slate-600 rounded-md'>Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    clothes.map((cloth, index) => (
                        <tr key={cloth._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {cloth.name}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {cloth.price}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {cloth.description}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/clothes/details/${cloth._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/clothes/edit/${cloth._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-800' />
                                    </Link>
                                    <Link to={`/clothes/delete/${cloth._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-800' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default ClothesTable