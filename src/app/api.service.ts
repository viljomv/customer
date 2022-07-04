import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  addUser(body:any){
    console.log(body);
    const headers=new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Orgin','*');
   return this.http.post('http://192.168.12.10/custregistration/api/Customers/DataAdd',body)
  }
  getUser(){ 
   return this.http.get<any>('http://192.168.12.10/custregistration/api/Customers')
  }  
 putUser(data:any,id:number){
  return this.http.put<any>('http://192.168.12.10/custregistration/api/Customers/DataUpdate?customerid='+id ,data);
 }
 deleteUser(id:number){
  return this.http.delete<any>('http://192.168.12.10/custregistration/api/Customers/DataDelete?customerid='+id);
 }
 logged():boolean{
  console.log("fghj",JSON.parse(sessionStorage.getItem('username')!));
  
  const user=JSON.parse(sessionStorage.getItem("username")!)
  return user!==null ? true:false;
}

logout():any{
  const user=JSON.parse(sessionStorage.getItem("")!)
  return user!==null?true:false
}

get isLoggedIn(): boolean { 
  const user = JSON.parse(sessionStorage.getItem('currentusername')!);
  return user !== null ? true : false;
}

}
