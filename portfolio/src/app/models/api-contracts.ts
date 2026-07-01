export interface BaseEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  count?: number;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  data: T[];
  count: number;
}

export interface ApiEntityResponse<T> extends ApiResponse<T> {
  data: T;
}

export interface ApiMutationResponse<T> {
  data: T | null;
  message: string;
}

export interface ApiMessageResponse {
  message: string;
}
