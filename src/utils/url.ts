const getBaseUrls = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  }
  if (process.env.VERCE_URL) {
    return `https://${process.env.VERCE_URL}`
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export { getBaseUrls }
