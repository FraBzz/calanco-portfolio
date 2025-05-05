export interface ApiProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
  features: string[];
  endpoints: {
    method: string;
    path: string;
  }[];
  exampleResponse: Record<string, any>;
}