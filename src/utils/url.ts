const getBaseUrls = () => {
  const environment = process.env.NODE_ENV

  const baseUrl =
    environment === 'development'
      ? 'https://localhost:3000'
      : `${process.env.NEXT_PUBLIC_VERCEL_URL}`
      
  return baseUrl
}

export { getBaseUrls }
