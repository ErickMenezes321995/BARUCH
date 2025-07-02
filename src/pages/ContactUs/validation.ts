import * as yup from "yup";

let schema = yup.object().shape({
  firstName: yup.string().required("Campo obrigatório."),
  lastName: yup.string().required("Campo obrigatório."),
  email: yup.string().email("E-mail inválido.").required("Campo obrigatório."),
  message: yup.string().required("Campo obrigatório."),
});

export const validation = async (values: any) => {
  console.log("Valores para validação:", values); // 👈 teste erick
  return schema
    .validate(values, { abortEarly: false })
    .then(() => undefined)
    .catch((error: yup.ValidationError) => {
      if (Array.isArray(error.inner)) {
        console.log("Erros de validação:", error.inner); // 👈 teste erick
        return error.inner.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.path || ""]: cur.message,
          };
        }, {});
      }
    });
};
