export type Author = {
    id: number
    username: string
    first_name: string
    last_name: string
    avatar: string
  }
  
  export type Post = {
    id: number
    title: string
    body: string
    created_at: string
    created_by: Author
  }