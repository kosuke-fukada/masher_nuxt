export default async ({ isDev, error, $axios }) => {
  if (isDev) {
    const networkInfo = await $axios.$get('https://ipinfo.io?callback')
    if (networkInfo.ip !== process.env.LOCAL_IP) {
      error({
        statusCode: 403,
        message: 'Access from a forbidden IP.'
      })
    }
  }
}
