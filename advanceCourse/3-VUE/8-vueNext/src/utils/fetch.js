import { wls } from './util'
const TODO_LIST = 'TODO_LIST'

export const $get = () => {
    return wls.getItem('TODO_LIST') || []
}

export const $post = (todoList) => {
    wls.setItem('TODO_LIST', todoList)
}