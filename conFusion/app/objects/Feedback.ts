export class Feedback {
  id: number;
  mychannel: string;
  firstName: string;
  lastName: string;
  agree: boolean;
  email: string;
  myChannel: string;
  comments: string;
  tel: Tel;
}

export class Tel{
	areaCode: string;
	number: string;
}