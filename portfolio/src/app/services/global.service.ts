import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ApiListResponse,
  ApiMutationResponse,
} from '../models/api-contracts';
import {
  ContactFormValue,
  ContactMessage,
  EducationEntry,
  EducationFormValue,
  HomeContent,
  ProjectEntry,
  ProjectRequest,
  ServiceEntry,
  ServiceFormValue,
  ServiceRequest,
  SkillCategory,
  SkillCategoryFormValue,
  SkillCategoryEditFormValue,
} from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private readonly baseUrl = environment.apiUrl;
  private homeCache$?: Observable<ApiListResponse<HomeContent>>;
  private educationCache$?: Observable<ApiListResponse<EducationEntry>>;
  private skillsCache$?: Observable<ApiListResponse<SkillCategory>>;
  private servicesCache$?: Observable<ApiListResponse<ServiceEntry>>;
  private projectsCache$?: Observable<ApiListResponse<ProjectEntry>>;
  private commentsCache$?: Observable<ApiListResponse<ContactMessage>>;

  constructor(private http: HttpClient) {}

  getHome(): Observable<ApiListResponse<HomeContent>> {
    if (!this.homeCache$) {
      this.homeCache$ = this.http.get<unknown>(`${this.baseUrl}/home/getHome`).pipe(
        map((response) => this.toListResponse<HomeContent>(response)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.homeCache$;
  }

  updateHome(body: FormData): Observable<ApiMutationResponse<HomeContent>> {
    return this.http.patch<unknown>(`${this.baseUrl}/home/updateHome`, body).pipe(
      map((response) =>
        this.toMutationResponse<HomeContent>(response, 'Home content updated', ['updatedData', 'data'])
      ),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  getEducation(): Observable<ApiListResponse<EducationEntry>> {
    if (!this.educationCache$) {
      this.educationCache$ = this.http.get<unknown>(`${this.baseUrl}/education/getEducation`).pipe(
        map((response) => this.toListResponse<EducationEntry>(response)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.educationCache$;
  }

  addEducation(body: EducationFormValue): Observable<ApiMutationResponse<EducationEntry>> {
    return this.http.post<unknown>(`${this.baseUrl}/education/addEducation?isDeleted=false`, body).pipe(
      map((response) => this.toMutationResponse<EducationEntry>(response, 'Education added successfully')),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  updateEducation(body: EducationFormValue, id: string): Observable<ApiMutationResponse<EducationEntry>> {
    return this.http.patch<unknown>(`${this.baseUrl}/education/updateEducation/${id}`, body).pipe(
      map((response) => this.toMutationResponse<EducationEntry>(response, 'Education updated successfully', ['data'])),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  deleteEducation(id: string): Observable<ApiMutationResponse<EducationEntry>> {
    return this.http.patch<unknown>(`${this.baseUrl}/education/deleteEducation/${id}`, { isDeleted: true }).pipe(
      map((response) => this.toMutationResponse<EducationEntry>(response, 'Education deleted successfully', ['data'])),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  getSkills(): Observable<ApiListResponse<SkillCategory>> {
    if (!this.skillsCache$) {
      this.skillsCache$ = this.http.get<unknown>(`${this.baseUrl}/skills/getSkills`).pipe(
        map((response) => this.toListResponse<SkillCategory>(response)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.skillsCache$;
  }

  addSkill(body: SkillCategoryFormValue): Observable<ApiMutationResponse<SkillCategory>> {
    return this.http.post<unknown>(`${this.baseUrl}/skills/createCategory`, body).pipe(
      map((response) => this.toMutationResponse<SkillCategory>(response, 'Skill category added successfully')),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  updateSkill(body: SkillCategoryEditFormValue, id: string): Observable<ApiMutationResponse<SkillCategory>> {
    return this.http.put<unknown>(`${this.baseUrl}/skills/${id}`, body).pipe(
      map((response) => this.toMutationResponse<SkillCategory>(response, 'Skill category updated successfully', ['data'])),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  deleteSkill(id: string): Observable<ApiMutationResponse<null>> {
    return this.http.patch<unknown>(`${this.baseUrl}/skills/${id}`, {}).pipe(
      map((response) => ({
        data: null,
        message: this.isRecord(response) && typeof response['message'] === 'string'
          ? response['message']
          : 'Category deleted successfully',
      })),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  getServices(): Observable<ApiListResponse<ServiceEntry>> {
    if (!this.servicesCache$) {
      this.servicesCache$ = this.http.get<unknown>(`${this.baseUrl}/services`).pipe(
        map((response) => this.toListResponse<ServiceEntry>(response)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.servicesCache$;
  }

  createService(data: ServiceRequest): Observable<ApiMutationResponse<ServiceEntry>> {
    return this.http.post<unknown>(`${this.baseUrl}/services`, data).pipe(
      map((response) => this.toMutationResponse<ServiceEntry>(response, 'Service added successfully')),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  updateService(id: string, data: ServiceRequest): Observable<ApiMutationResponse<ServiceEntry>> {
    return this.http.put<unknown>(`${this.baseUrl}/services/${id}`, data).pipe(
      map((response) => this.toMutationResponse<ServiceEntry>(response, 'Service updated successfully')),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  deleteService(id: string): Observable<ApiMutationResponse<ServiceEntry>> {
    return this.http.delete<unknown>(`${this.baseUrl}/services/${id}`).pipe(
      map((response) =>
        this.toMutationResponse<ServiceEntry>(response, 'Service deleted successfully', ['data', 'deleted'])
      ),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  restoreService(id: string): Observable<ApiMutationResponse<ServiceEntry>> {
    return this.http.patch<unknown>(`${this.baseUrl}/services/${id}/restore`, { deleted: false }).pipe(
      map((response) =>
        this.toMutationResponse<ServiceEntry>(response, 'Service restored successfully', ['data', 'restored'])
      ),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  getProjects(): Observable<ApiListResponse<ProjectEntry>> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http.get<unknown>(`${this.baseUrl}/project/getProjects`).pipe(
        map((response) => this.toListResponse<ProjectEntry>(response)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.projectsCache$;
  }

  addProject(body: FormData): Observable<ApiMutationResponse<ProjectEntry>> {
    return this.http.post<unknown>(`${this.baseUrl}/project`, body).pipe(
      map((response) => this.toMutationResponse<ProjectEntry>(response, 'Project added successfully')),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  updateProject(body: FormData | ProjectRequest, id: string): Observable<ApiMutationResponse<ProjectEntry>> {
    return this.http.put<unknown>(`${this.baseUrl}/project/${id}`, body).pipe(
      map((response) => this.toMutationResponse<ProjectEntry>(response, 'Project updated successfully', ['data'])),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  deleteProject(id: string): Observable<ApiMutationResponse<ProjectEntry>> {
    return this.http.patch<unknown>(`${this.baseUrl}/project/${id}`, {}).pipe(
      map((response) => ({
        data: null,
        message: this.isRecord(response) && typeof response['message'] === 'string'
          ? response['message']
          : 'Project deleted successfully',
      })),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  getComment(): Observable<ApiListResponse<ContactMessage>> {
    if (!this.commentsCache$) {
      this.commentsCache$ = this.http.get<unknown>(`${this.baseUrl}/contact`).pipe(
        map((response) => this.toListResponse<ContactMessage>(response)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.commentsCache$;
  }

  addComment(body: ContactFormValue): Observable<ApiMutationResponse<ContactMessage>> {
    return this.http.post<unknown>(`${this.baseUrl}/contact`, body).pipe(
      map((response) => this.toMutationResponse<ContactMessage>(response, 'Message sent successfully')),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  deleteComment(id: string): Observable<ApiMutationResponse<ContactMessage>> {
    return this.http.patch<unknown>(`${this.baseUrl}/contact/${id}`, {}).pipe(
      map((response) => this.toMutationResponse<ContactMessage>(response, 'Message deleted successfully', ['data'])),
      tap(() => this.invalidatePortfolioCaches())
    );
  }

  private invalidatePortfolioCaches(): void {
    this.homeCache$ = undefined;
    this.educationCache$ = undefined;
    this.skillsCache$ = undefined;
    this.servicesCache$ = undefined;
    this.projectsCache$ = undefined;
    this.commentsCache$ = undefined;
  }

  private toListResponse<T>(response: unknown): ApiListResponse<T> {
    if (Array.isArray(response)) {
      return {
        data: response as T[],
        count: response.length,
      };
    }

    if (this.isRecord(response)) {
      const data = Array.isArray(response['data']) ? (response['data'] as T[]) : [];
      return {
        data,
        count: typeof response['count'] === 'number' ? response['count'] : data.length,
        message: typeof response['message'] === 'string' ? response['message'] : undefined,
      };
    }

    return {
      data: [],
      count: 0,
    };
  }

  private toMutationResponse<T>(
    response: unknown,
    fallbackMessage: string,
    dataKeys: string[] = ['data']
  ): ApiMutationResponse<T> {
    if (this.isRecord(response)) {
      for (const key of dataKeys) {
        if (key in response) {
          return {
            data: response[key] as T | null,
            message: typeof response['message'] === 'string' ? response['message'] : fallbackMessage,
          };
        }
      }

      if ('data' in response) {
        return {
          data: response['data'] as T | null,
          message: typeof response['message'] === 'string' ? response['message'] : fallbackMessage,
        };
      }
    }

    return {
      data: (response as T) ?? null,
      message: fallbackMessage,
    };
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
