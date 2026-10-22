import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../../../domain/dto/LoginRequest.dto';
import { LoginResponse } from '../../../../domain/dto/LoginResponse.dto';
import { environment } from '../../../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }


  login(user: LoginRequest){
    return this.httpClient.post<LoginResponse>(`${ environment.urlApi }/api/auth/login`, user);
  }

  



}
