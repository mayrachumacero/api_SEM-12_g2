import { Request, Response, NextFunction } from 'express';
import HttpStateCodes from '../utils/http-state-codes';

// Vamos A definir nuestro mediationsw
export const RegisterMediationsw = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body
  
  const expectedFields = ['name', 'email','password'];
  const validKeys = Object.keys(req.body);

  const missingFields = expectedFields.filter((field) => !validKeys.includes(field));

  const extraFields = validKeys.filter((key) => !expectedFields.includes(key));

  if (missingFields.length > 0) {
    return res.json({
      message:`Faltan los siguientes campos en la solicitud: ${missingFields.join(', ')}`, 
      status:HttpStateCodes.BAD_REQUEST});
  }

  if (extraFields.length > 0) {
    return res.json({message:`Campos no válidos en la solicitud: ${extraFields.join(', ')}`, status:HttpStateCodes.BAD_REQUEST});
 }

 if(!(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s_.,]{2,50}$/).test(name)){
  return res.json({message:`ingrese solo valores a-z A-Z 0-9 de entre 2-50 caracteres en el campo nombre`,status:HttpStateCodes.BAD_REQUEST});
}
if(!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,20}$/).test(email)){
  return res.json({
    message:`correo electronico no valido`,status:HttpStateCodes.BAD_REQUEST});
}
if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password)) {
  return res.json({message:'Ingrese una contraseña con almenos una letra, un digito 0-9 y con 8 caracteres como minimo', status:HttpStateCodes.BAD_REQUEST});
}


  next();
};