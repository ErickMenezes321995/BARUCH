import {
  Box,
  Button,
  Flex,
  Input,
  Link,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import { validation } from "./validation";
import axios from "axios";

const contactEmail = "ericksaraiva30@gmail.com";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    setLoading(true);
    // Simula uma ação assíncrona
    setTimeout(() => {
      setLoading(false);
      alert("Ação finalizada!");
    }, 2000);
  };

  const handleSubmitForm = async (values: any, form: any) => {
    setLoading(true);
    try {
      await axios.post("https://bairro-manaus.onrender.com/api/send", values);
      //await axios.post("http://localhost:4000/api/send", values);
      toast({
        title: "Mensagem enviada com sucesso!",
        status: "success",
      });
      form.restart();
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem!",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer
      title="Fale conosco"
      flexDirection={{ base: "column", sm: "row", md: "row" }}
    >
      <Flex width={{ base: "100%", sm: "50%" }} flexDirection="column">
        <Box maxWidth={{ base: "100%", sm: "80%" }}>
          <Text>
            Se você quer contribuir, patrocinar, fazer uma doação ou participar
            desse projeto, preencha o formulário e entraremos em contato com
            você.
          </Text>
          <Text margin="1em 0">
            Caso queira também você pode entrar em contato pelo nosso e-mail.
          </Text>
          <Box>
            <Link
              color="brand.400"
              fontWeight="700"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </Link>
          </Box>

          <Flex marginTop="2em">
            <SocialMedia />
          </Flex>
        </Box>
      </Flex>
      <Flex
        width={{ base: "100%", sm: "50%" }}
        marginTop={{ base: "2em", sm: "0" }}
      >
        <Form
          onSubmit={handleSubmitForm}
          validate={validation}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex w="100%" gap="1em">
                <Field name="firstName">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      isInvalid={meta.touched && meta.invalid}
                      errorBorderColor="neutral.error"
                      _placeholder={{
                        color: meta.touched && meta.invalid && "neutral.error",
                      }}
                      placeholder="Nome"
                    />
                  )}
                </Field>

                <Field name="lastName">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      as="input"
                      isInvalid={meta.error && meta.touched}
                      errorBorderColor="neutral.error"
                      _placeholder={{
                        color: meta.touched && meta.invalid && "neutral.error",
                      }}
                      placeholder="Sobrenome"
                    />
                  )}
                </Field>
              </Flex>

              <Flex w="100%">
                <Field name="email">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      isInvalid={meta.touched && meta.invalid}
                      errorBorderColor="neutral.error"
                      _placeholder={{
                        color: meta.touched && meta.invalid && "neutral.error",
                      }}
                      placeholder="E-mail"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
              </Flex>

              <Flex w="100%">
                <Field name="message">
                  {({ input, meta }) => (
                    <Textarea
                      {...input}
                      isInvalid={meta.touched && meta.invalid}
                      errorBorderColor="neutral.error"
                      _placeholder={{
                        color: meta.touched && meta.invalid && "neutral.error",
                      }}
                      placeholder="Mensagem"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
              </Flex>

              <Flex justify="flex-end">
              <Button
               type="submit"
               isDisabled={invalid || loading}
               width={{ base: "100%", sm: "unset" }}
              > 
               {loading ? "Enviando..." : "Enviar mensagem"}
              </Button>

              </Flex>
            </form>
          )}
        />
      </Flex>
    </SectionContainer>
  );
};

export default ContactUs;