import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
// import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'

import styles from './index.module.css'

function HomepageHeader() {
  return (
    <header className={clsx('', styles.heroBanner)}>
      <div className='container'>
        <Heading as='h1'>
          <img src='/img/hero.png' alt='The Simpsons API Logo' />
        </Heading>
        <div className={styles.buttons}>
          <Link className='button button--secondary button--lg' to='/docs/intro'>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  )
}
