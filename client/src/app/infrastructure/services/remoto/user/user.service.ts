import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { UserDelete, UserExist, UserReset, UserResponse } from '../../../../domain/dto/userResponse.dto';
import { Observable } from 'rxjs';
import { UserRequest } from '../../../../domain/dto/userRequest.dto';
import { use } from 'apexcharts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(`${ environment.urlApi }/api/user/list/details`);
  }

  createUser(user: UserRequest): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${ environment.urlApi }/api/user`, user);
  }

  updateUser(id_usuario: number,user: UserRequest): Observable<UserResponse> {
    return this.httpClient.put<UserResponse>(`${ environment.urlApi }/api/user/${id_usuario}`, user);
  }

  deleteUser(id_usuario: number): Observable<UserDelete> {
    return this.httpClient.delete<UserDelete>(`${ environment.urlApi }/api/user/${id_usuario}`);
  }

  findByUsername(username: string): Observable<UserExist> {
    return this.httpClient.get<UserExist>(`${ environment.urlApi }/api/cuenta-exist/${username}`);
  }

  resetPassword(username: string, password: string): Observable<UserReset> {
    return this.httpClient.put<UserReset>(`${ environment.urlApi }/api/reset-cuenta`, {username, password});
  }

  autoRegister(user: UserRequest): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${ environment.urlApi }/api/auto-registro`, user);
  }
}
