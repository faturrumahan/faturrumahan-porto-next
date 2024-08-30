export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    // Add other user fields as needed
  };
}

export interface IProjectData extends FormData {
  title: string;
  description: string;
  category: number;
  tag: string;
  url_path: string;
  files: any[];
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  category: number;
  tag: string;
  url_path: string;
  image_path: string;
  image_delete_id: string;
}

export interface ICategory {
  id: number;
  name: string;
  is_active: boolean;
}
