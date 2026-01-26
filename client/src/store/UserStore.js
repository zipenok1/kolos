import { makeAutoObservable, runInAction } from 'mobx'

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._isLoading = true 
    makeAutoObservable(this)
    this.checkAuth()
  }

  checkAuth() {
    const token = localStorage.getItem('token')
    if (token) {
      runInAction(() => {
        this._isAuth = true
        this._isLoading = false
      })
    } else {
      runInAction(() => {
        this._isLoading = false
      })
    }
  }

  setIsAuth(bool) {
    this._isAuth = bool
    if (!bool) {
      localStorage.removeItem('token')
    }
  }

  get isAuth() {
    return this._isAuth
  }

  get isLoading() {
    return this._isLoading
  }
}