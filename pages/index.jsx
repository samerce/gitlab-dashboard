import Head from 'next/head'
import Header from '../components/Header'
import Threads from '../components/Threads'
import Requests from '../components/Requests'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full relative bg-black'>
      <Head>
        <title>Code Review</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex grow flex-col items-center w-full h-screen px-3 text-white max-w-[1920px]'>
        <Header />
        
        <div className='flex w-full items-start justify-center h-full relative overflow-hidden'>
          <Requests />
          <div className='shrink-0 grow-0 basis-[1px] w-[1px] h-full bg-tpWhite mx-2'>&nbsp;</div>
          <Threads />
        </div>

      </main>
    </div>
  )
}
