import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import LoadingWheel from '../../../components/LoadingWheel';
import { UserContext } from '../../../lib/context';
import { auth, firestore } from '../../../lib/firebase';

import kebabCase from 'lodash.kebabcase';
import AuthCheck from '../../../components/AuthCheck';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { timeLog } from 'console';
import Link from 'next/link';
import Head from 'next/head';

const Create = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');

  const slug = encodeURI(kebabCase(title))
    ? encodeURI(kebabCase(title))
    : 'Rute-Title';
  const isValid =
    title.length > 3 &&
    title.length < 100 &&
    title != 'create' &&
    slug != 'create';

  const createIdea = async (e: FormEvent) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('ideas')
      .doc(slug);

    const data = {
      slug,
      uid,
      title,
      description,
      status,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await ref.set(data);

    toast.success('Idea Created');

    router.push('/ideas');
  };
  return (
    <AuthCheck>
      <Head>
        <title>Create New Idea</title>
      </Head>
      <div>
        <form
          onSubmit={createIdea}
          className='flex flex-col justify-center items-center space-y-8 min-h-[600px]'
        >
          <div>
            <div className='block'>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Title'}
                className='bg-gray-500/10 rounded-md p-4 font-semibold text-center w-[200px]'
              />
              <Link
                className='py-[15.5px] px-[10px] ml-2 rounded-lg font-semibold enabled:hover:opacity-80 duration-300 text-white border-2 border-red-600 hover:bg-red-600/30'
                href='/ideas'
              >
                ❌
              </Link>
            </div>

            <p className='text-xs text-left mt-1 ml-2 text-gray-500'>{slug}</p>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={'Description'}
            className='bg-gray-500/10 rounded-md p-2 resize-y block w-[250px] h-[200px] text-sm text-start font-semibold'
          />

          <div className='flex space-x-5'>
            <div>
              <input
                className='appearance-none rounded-full h-4 w-4 border border-red-600 bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='radio'
                value='todo'
                name='status'
                checked={status == 'todo'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className='font-semibold'>To Do</label>
            </div>
            <div>
              <input
                className='appearance-none rounded-full h-4 w-4 border border-yellow-400 bg-white checked:bg-yellow-400 checked:border-yellow-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='radio'
                value='inprogress'
                name='status'
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className='font-semibold'>In Progress</label>
            </div>
            <div>
              <input
                className='appearance-none rounded-full h-4 w-4 border border-green-600 bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='radio'
                value='done'
                name='status'
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className='font-semibold'>Done</label>
            </div>
          </div>
          <button
            className='bg-green-700 py-2 px-14 rounded-lg font-semibold enabled:hover:opacity-80 duration-300 text-white disabled:bg-red-700'
            type='submit'
            disabled={!isValid}
          >
            Save
          </button>
        </form>
      </div>
    </AuthCheck>
  );
};

export default Create;
