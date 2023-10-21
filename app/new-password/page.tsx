import Image from 'next/image';
import schoolklaar from '../../public/Schoolklaar.png';
import type {AppProps} from "next/app";
import PasswordForm from './passwordForm';



export default function Home({Component, pageProps}:AppProps) {


    return (
      <main className="min-h-screen w-full">
        <section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className='fadeIn first bg-[#6FB4E8] flex items-center justify-center'>
              {/* Assuming the image is not larger than its container, otherwise you might need to adjust the width and height */}
              <Image src={schoolklaar} id="icon" alt="User Icon" width={850} height={850} />
            </div>  
           
            <div className="lg:h-screen lg:flex items-center w-full lg:justify-center px-8 mt-12 lg:mt-0">
              <PasswordForm />
            </div>
        </section>
      </main>
    );
}
