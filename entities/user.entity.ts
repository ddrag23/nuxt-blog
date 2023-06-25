export interface CreateUser {
  name : string
  email : string
  role_id : number
}

export interface UpdateUser {
  id : number
  name : string
  email : string
  password : string
  role_id : number
}

