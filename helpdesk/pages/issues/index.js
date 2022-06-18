import SupportList from '@/components/SupportList'
import { useAllIssues } from '@/hooks/useAllIssues'
import axios from 'axios'
// import { set } from 'msw/lib/types/context'
import React from 'react'
import { useEffect, useState } from 'react'

const Home = () =>  {

    return (
      <main>
        <a href="/issues/create">Ny hendvendelse</a>
        <SupportList /> 
      </main>
    )   
  }

  export default Home





