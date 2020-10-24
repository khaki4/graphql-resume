import Head from 'next/head'
import { useQuery, gql } from '@apollo/client'
import styles from '../styles/Home.module.css'

const ResumeQuery = gql`
  query ResumeQuery {
    bio {
      name
      tagline
      email
      objective
      github
      website
      linkedin
    }
    position {
      id
      title
      company
      location
      startDate
      endDate
      years
      months
      achievements
    }  
  }
`

export default function Home() {
  const { data, error, loading } = useQuery(ResumeQuery)

  if (error) {
    return <span>Error.. oops!</span>
  }

  if (loading) {
    return (
      <header className={styles.header}>
        <h1>Kevin</h1>
        <h2>loding...</h2>
      </header>
    )
  }

  const { bio, position } = data
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <header className={styles.header}>
        <h1>{bio.name}</h1>
        <h2>{bio.tagline}</h2>
      </header>
      
      <div className={styles.split}>
        <div className={styles.left}>
          <h2>Contackt</h2>
          <p>
            <strong>Email</strong>{' '}
            <a href={`mailto:${bio.email}`}>{bio.email}</a>
          </p>
          <p>
            <strong>Website</strong>{' '}
            <a href={bio.website}>{new URL(bio.website).host}</a>
          </p>
          <p>
            <strong>Github</strong>{' '}
            <a href={bio.github}>{bio.github.replace('https://', '')}</a>
          </p>
          <p>
            <strong>Linkedin</strong>{' '}
            <a href={bio.linkedin}>{bio.linkedin.replace('https://', '')}</a>
          </p>
        </div>
        <div className={styles.right}>
          right
        </div>       
      </div>
    </>
  )
}