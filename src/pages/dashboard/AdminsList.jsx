import {
  Avatar,
  Button,
  Chip,
  Input,
  Option,
  Select,
  Switch,
  Typography,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import {
  ButtonWithHoverEffect,
  Loader,
  NoDataComponent,
  PageTitle,
  PaginationButton,
} from '../../components';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { base64ToImage, getRequest } from '../../utils';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const LIMIT = 10;

  const navigate = useNavigate();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['All Admins'],
    queryFn: async () => {
      const res = await getRequest({
        endpoint: `/user/all-admins`,
      });

      return res?.data || [];
    },
  });

  const TABLE_HEAD = ['User', 'Email', 'Registered Date'];

  const TABLE_ROWS = users || [];

  return (
    <div className='bg-white p-6 rounded-lg px-2 md:px-5 py-5 md:pt-3'>
      {isLoading && <Loader />}
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

      <div className='mt-10'>
        {TABLE_ROWS.length === 0 && (
          <NoDataComponent message='NO USERS FOUND' imgWidth='md:w-[50%]' />
        )}

        {TABLE_ROWS.length !== 0 && (
          <>
            <div className='px-0'>
              <table className='w-full table-auto text-left'>
                <thead>
                  <tr>
                    {TABLE_HEAD.map(head => (
                      <th
                        key={uuid()}
                        className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal leading-none opacity-70'>
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {TABLE_ROWS.map((user, index) => {
                    const {
                      firstName,
                      lastName,
                      createdOn,
                      email,
                      profilePicture,
                    } = user;

                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={uuid()}>
                        <td className={classes}>
                          <div className='flex items-center gap-3'>
                            <Avatar
                              src={base64ToImage(profilePicture)}
                              alt={firstName}
                              size='sm'
                            />
                            <div className='flex flex-col'>
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'>
                                {firstName}
                                {lastName}
                              </Typography>
                            </div>
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70'>
                            {email}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'>
                            {createdOn}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;

