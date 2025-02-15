import Image from 'next/image';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';

const LogInWithGoogle = () => {
  const { user } = useContext(UserContext);

  // 1. user sing out <SingInButton/>
  // 2. user sing in but missed username <UsernameForm/>
  // 3. user sing in, with username <SingOutButton/>

  return user ? <SingOutButton /> : <SingInButton />;
};

export function SingInButton() {
  const signInWithGoogle = async () => {
    const createUser = async () => {
      const uid = auth.currentUser.uid;

      const ref = firestore.collection('users').doc(uid);

      const data = {
        uid,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        name: auth.currentUser.displayName,
        phoneNumber: auth.currentUser.phoneNumber,
        photoUrl: auth.currentUser.photoURL,
        metaData: { ...auth.currentUser.metadata },
        updatedAt: serverTimestamp(),
      };

      await ref.set(data);

      // toast.success('User Created');
    };
    await auth
      .signInWithPopup(googleAuthProvider)
      // put pop up telling the user that successfully signed in
      .then((success: any) => {
        toast.success('Signed In');
        createUser();
        // console.log(auth.currentUser);
      })
      // put pop up telling the user that have to sing in
      .catch((e: any) => toast.error('Pop-Up Closed. Please Sign In'));
  };
  return (
    <div
      className='text-black bg-white mx-3 rounded-md text-center cursor-pointer w-5/6 hover:bg-green-600/40 duration-500 py-1 font-semibold'
      onClick={signInWithGoogle}
    >
      <Image
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
        alt='Google'
        width={20}
        height={20}
        className='inline mr-3 mb-1'
      ></Image>

      <p className='inline'>Sign In</p>
    </div>
  );
}

function SingOutButton() {
  // When sign out redirect to home to avoid errors
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    toast('See you later!', {
      icon: '👋',
    });
    router.push('/');
  };

  return (
    <div
      className='text-black bg-white mx-3 rounded-md text-center cursor-pointer w-5/6 hover:bg-red-500/50 duration-500 py-1 font-semibold '
      onClick={handleSignOut}
    >
      <Image
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
        alt='Google'
        width={20}
        height={20}
        className='inline mr-3 mb-1'
      ></Image>

      <p className='inline'>Sign Out</p>
    </div>
  );
}

export default LogInWithGoogle;
