import { Request, Response } from 'express';
import createUser from './services/CreateUser';


export function helloWord(request: Request, response: Response) {

  const users = createUser({
    email: 'carlosstenzel@hotmail.com',
    password: '12345',
    techs: [
      'Node.js',
      'React.Js',
      { title: "Js", experience: 100},
    ]
  });
  
  return response.json({ message: 'Hello Word'});
}