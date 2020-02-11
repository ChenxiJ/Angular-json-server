export class Course {
  title: string;
  grade: string;
  lecturerRating: number;
  date: string;
}

export class Study { 
    id: string;
    name: string;
    logo: string;
    campus: string;
    country: string;
    city: string;
    degree: string;
    major: string;
    startYear: number;
    endYear: number;
    current: boolean;
    description: string;
    courses: Course[];
}