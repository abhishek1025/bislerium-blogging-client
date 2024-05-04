import React from 'react';
import { ButtonWithHoverEffect, PageTitle } from '../../components';
import { FiPlus } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminsList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3 h-full'>
        <section className='flex flex-col md:flex-row items-center justify-between'>
          <PageTitle title='Admins List' />

          <div className='flex flex-col md:flex-row items-center gap-y-3 gap-x-3 md:mr-3 w-full md:w-auto mt-4'>
            <div className='w-full md:w-auto'>
              <ButtonWithHoverEffect
                className='px-7 rounded-3xl gap-x-2'
                type='button'
                onClick={() => {
                  navigate('new');
                }}>
                <FiPlus /> Add
              </ButtonWithHoverEffect>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminsList;

