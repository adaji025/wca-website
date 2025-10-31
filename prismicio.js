import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'

export const repositoryName = 'your-wca-repo-name' // Replace with your repo name

const routes = [
  {
    type: 'homepage',
    path: '/',
  },
]

export const createClient = (config = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}