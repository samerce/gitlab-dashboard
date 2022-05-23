import Head from 'next/head'
import Header from '../components/Header'
import Threads from '../components/Threads'
import Requests from '../components/Requests'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full relative bg-main-dk'>
      <Head>
        <title>Code Review</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex grow flex-col items-center w-full h-screen px-12 text-white'>
        <Header />
        
        <div className='flex w-full items-start h-full relative overflow-hidden'>
          <Threads />
          <div className='shrink-0 grow-0 basis-[1px] w-[1px] h-full'>&nbsp;</div>
          <Requests />
        </div>

      </main>
    </div>
  )
}
