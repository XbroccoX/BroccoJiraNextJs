import type { NextPage } from 'next'
import { Typography, CardHeader, CardContent, Grid, Card } from '@mui/material'
import { Layout } from '../components/layouts'
import { EntryList } from '../components/ui';
import { NewEntry } from '../components/ui/NewEntry';

const HomePage: NextPage = () => {

  // console.log(process.env.NEXT_PUBLIC_CLIENT_KEY);

  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}  >
          <Card sx={{ height: 'calc(100vh - 100px)', margin: '10px 0px 0px 10px' }}>
            <CardHeader title="Pendientes" />

            <NewEntry />
            <EntryList status='pending' />


          </Card>
        </Grid>

        <Grid item xs={12} sm={4}  >
          <Card sx={{ height: 'calc(100vh - 100px)', margin: '10px 0 5px 0' }}>
            <CardHeader title="En progreso" />
            {/* <NewEntry /> */}
            <EntryList status='in-progress' />

          </Card>
        </Grid>

        <Grid item xs={12} sm={4}  >
          <Card sx={{ height: 'calc(100vh - 100px)', margin: '10px 10px 0px 0px' }}>
            <CardHeader title="Completadas" />
            {/* <NewEntry /> */}
            <EntryList status='finished' />

          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}

export default HomePage;
