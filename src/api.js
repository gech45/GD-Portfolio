const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const apiUrl = `${backendUrl}/api`

export function imageUrl(image) {
  if (image && image.startsWith('/')) return `${backendUrl}${image}`
  return image
}
