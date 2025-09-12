import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Service {
  _id: string;
  title: string;
  tagline: string;
  bullets: string[];
  icon: string;
  cta?: string;
  isDeleted: boolean;
  deletedAt?: Date;
}
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(private http: HttpClient) { }
  // baseUrl = 'http://localhost:3000/api'
  private baseUrl = environment.apiUrl;
    getHome():Observable<any>{
      return this.http.get(`${this.baseUrl}/home/getHome`)
  }
  updateHome(body:any): Observable<any>{
    return this.http.patch(`${this.baseUrl}/home/updateHome`,body)
  }

  getEducation(): Observable<any>{
    return this.http.get(`${this.baseUrl}/education/getEducation`)
  }
  addEducation(body:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/education/addEducation?isDeleted=false`,body)
  }
  updateEducation(body: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/education/updateEducation/${id}`,body)
  }
  deleteEducation(id:string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/education/deleteEducation/${id}`,{isDeleted:true})
  }
  getSkills(): Observable<any>{
    return this.http.get(`${this.baseUrl}/skills/getSkills`);
  }
  addSkill(body:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/skills/createCategory`,body)
  }

   updateSkill(body: any, id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/skills/${id}`, body);
  }
  deleteSkill(id: string): Observable<any>{
    return this.http.patch(`${this.baseUrl}/skills/${id}`,{})
  }

  getServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/services`);
  }

  getProjects(): Observable<any>{
    return this.http.get(`${this.baseUrl}/project/getProjects`)
  }
  addProject(body:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/project`,body)
  }
  updateProject(body:any,id:string): Observable<any>{
    return this.http.put(`${this.baseUrl}/project/${id}`,body)
  }
  deleteProject(id:string): Observable<any>{
    return this.http.patch(`${this.baseUrl}/project/${id}`,{})
  }

  getComment(): Observable<any>{
    return this.http.get(`${this.baseUrl}/contact`)
  }
  addComment(body: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/contact`,body)
  }
  deleteComment(id: string): Observable<any>{
    return this.http.patch(`${this.baseUrl}/contact/${id}`,{})
  }
  createService(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/services`, data);
  }
  updateService(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/services/${id}`, data);
  }
  deleteService(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/services/${id}`);
  }
  restoreService(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/services/${id}/restore`, { deleted: false });
  }
}
