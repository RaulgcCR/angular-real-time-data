export interface Message {
    message: {
        id: number
        isFavorite: boolean
        text: string
        user: {
            name: string
            profile_image_url: string
            profile_image_url_https: string
            screen_name: string
        }
    }
  }