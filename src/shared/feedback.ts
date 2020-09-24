interface Feedback {
  firstname: string;
  lastname: string;
  telnum: string;
  email: string;
  agree: boolean;
  contacttype: string;
  message: string;
}

const ContactType = ['None', 'Tel', 'Email'];

export { Feedback, ContactType };
