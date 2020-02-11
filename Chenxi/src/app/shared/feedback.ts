export class Feedback {
  firstname: string;
  lastname: string;
  email: string;
  telnum: number;
  agree: boolean;
  contacttype: string;
  message: string;
}

export const ContactType = ['None', 'Email', 'Tel'];