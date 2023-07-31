import Layout from '@/components/Layout'
import { CONFIG } from '@/config'
import axios from 'axios'
import { ArcElement, Legend, Tooltip, Chart, registerables } from 'chart.js'
import React, { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement, Tooltip, Legend, ...registerables)

export const getServerSideProps = async (context: any) => {
  try {
    const [users] = await Promise.all([
      await axios.get(CONFIG.base_url.api + `/users`, {
        headers: {
          'bearer-token': 'serversalesproperties2023'
        }
      })
      // await axios.get(CONFIG.base_url.api + `/customers`, {
      //   headers: {
      //     'bearer-token': 'serversalesproperties2023',
      //     'x-app-id': 'id.app.midland'
      //   }
      // }),
      // await axios.get(CONFIG.base_url.api + `/apps`, {
      //   headers: { 'bearer-token': 'serversalesproperties2023' }
      // }),
    ])
    return {
      props: {
        users: users?.data || null,
        // customers: customers?.data?.items || null,
        // apps: apps?.data?.items || null
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Dashboard({ users, apps, customers }: { users: any, apps: any, customers: any }) {
  const data = {
    labels: ['User', 'Customer'],
    datasets: [
      {
        label: "Data Users",
        data: [
          users?.total_items || 0,
          5
        ],
        fill: false,
        borderColor: ['rgba(75,192,192,1)', 'rgba(75,192,152,1)']
      }
    ]
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Fragment>
      <Layout title='Dashboard'>
        <div>
          <h1>Dash</h1>
          <div className='w-[500px] h-[300px]'>
            <Doughnut data={data} options={{
              scales: {
                y: { beginAtZero: true }
              }
            }} />
          </div>
        </div>
      </Layout>
    </Fragment>
  )
}