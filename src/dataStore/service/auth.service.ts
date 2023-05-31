/* import $api from '../api'; */
import { $api } from '../api'

import { ILoginData } from 'dto/user.dto'

export default class AuthService {
  static async login(data: ILoginData): Promise<any> {
    return $api.post<ILoginData>('/auth/in', data)
  }
}

/* 	static async registration(login, firstName, lastName, email, pass) {
		return $api.post('/api/v1/auth/signup', { login, firstName, lastName, email, pass });
	}

	static async logout() {
		return $api.post('/api/v1/auth/logout');
	}

	static async checkAuth() {
		return $api.post('/api/v1/auth/refresh');
	}
} */
