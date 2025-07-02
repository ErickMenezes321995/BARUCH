import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Text,
  Image,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';

import Logo from "../../assets/logo-avai-256.png";
//import Fundo from "../../assets/fundo.png";

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

interface FormData {
  nome: string;
  email: string;
  cpf: string;
  nascimento: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
}

export default function CadastroTorcedorPage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cpfError, setCpfError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cpf: '',
    nascimento: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarCPF(formData.cpf)) {
      setCpfError('CPF inválido');
      return;
    } else {
      setCpfError('');
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      const signupResponse = await fetch(
        'https://yksggzzgvnocuwzmdyda.supabase.co/auth/v1/signup',
        {
          method: 'POST',
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrc2dnenpndm5vY3V3em1keWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDEwNTYsImV4cCI6MjA2MzQxNzA1Nn0.Ulj2yhrvJarDkCEK4zONq2N8z75tyf6ZcRf8K959H3Q',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.senha,
            user_metadata: {
              full_name: formData.nome,
              cpf: formData.cpf,
              telefone: formData.telefone,
              nascimento: formData.nascimento,
            },
          }),
        }
      );

      const signupData = await signupResponse.json();
      console.log('Resposta do signup:', signupData);

      if (!signupResponse.ok) {
        throw new Error(signupData.error_description || 'Erro ao cadastrar usuário');
      }

      if (!signupData.access_token) {
        onOpen();
        return;
      }

      const userId = signupData.user?.id || signupData.id;

      if (!userId) {
        throw new Error('ID do usuário não retornado no signup');
      }

      const profileResponse = await fetch(
        'https://yksggzzgvnocuwzmdyda.supabase.co/rest/v1/torcedores',
        {
          method: 'POST',
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrc2dnenpndm5vY3V3em1keWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDEwNTYsImV4cCI6MjA2MzQxNzA1Nn0.Ulj2yhrvJarDkCEK4zONq2N8z75tyf6ZcRf8K959H3Q',
            Authorization: `Bearer ${signupData.access_token}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify({
            user_id: userId,
            nome: formData.nome,
            email: formData.email,
            cpf: formData.cpf,
            nascimento: formData.nascimento,
            telefone: formData.telefone,
          }),
        }
      );

      if (!profileResponse.ok) {
        const profileError = await profileResponse.json();
        throw new Error(profileError.message || 'Erro ao salvar dados adicionais');
      }

      alert('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
      console.error('Erro no cadastro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      //bgImage={`url(${Fundo})`}
      bgSize="cover"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={6}
    >
      <Container maxW="md" bg="rgba(0,0,0,0.7)" color="white" borderRadius="md" p={6} boxShadow="xl">
        <Box textAlign="center" mb={6}>
          <Image src={Logo} alt="Avaí F.C." w={20} mx="auto" />
          <Text fontSize="xl" mt={4} fontWeight="bold">
            CADASTRO DE TORCEDOR
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Nome completo</FormLabel>
            <Input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              color="white"
              placeholder="Nome completo"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>E-mail</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              color="white"
              placeholder="email@example.com"
            />
          </FormControl>

          <FormControl mb={4} isRequired isInvalid={!!cpfError}>
            <FormLabel>CPF</FormLabel>
            <Input
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              color="white"
              placeholder="000.000.000-00"
              maxLength={14}
            />
            <FormErrorMessage>{cpfError}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Data de nascimento</FormLabel>
            <Input
              name="nascimento"
              type="date"
              value={formData.nascimento}
              onChange={handleChange}
              bg="white"
              color="black"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Telefone</FormLabel>
            <Input
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              color="white"
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input
                name="senha"
                type={showPassword ? 'text' : 'password'}
                value={formData.senha}
                onChange={handleChange}
                color="white"
                placeholder="Senha"
              />
              <InputRightElement>
                <Button variant="ghost" onClick={togglePasswordVisibility} tabIndex={-1}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb={6} isRequired>
            <FormLabel>Confirmar senha</FormLabel>
            <InputGroup>
              <Input
                name="confirmarSenha"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmarSenha}
                onChange={handleChange}
                color="white"
                placeholder="Confirmar senha"
              />
              <InputRightElement>
                <Button variant="ghost" onClick={togglePasswordVisibility} tabIndex={-1}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isLoading}
            loadingText="Cadastrando..."
          >
            Cadastrar
          </Button>
        </form>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader>Aviso</ModalHeader>
            <ModalBody>
              <Text>Verifique seu e-mail para confirmação de cadastro.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
