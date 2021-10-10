import {createContext} from 'react'
import {INITIALAUTH} from './privates'

export const AuthContext = createContext(INITIALAUTH)
export const PostsContext = createContext(null)