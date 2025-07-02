import React, { useState, useContext, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Image,
  useBreakpointValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import AvaiLogo from '../../assets/logo-avai-256.png';
//import fundo from '../../assets/fundo.png';
//import { AuthContext } from '../../Context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isResetOpen, setIsResetOpen] = useState<boolean>(false);
  const [emailReset, setEmailReset] = useState<string>('');
  const [resetMessage, setResetMessage] = useState<string>('');
  const [resetLoading, setResetLoading] = useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate();
//const { login } = useContext(AuthContext);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogin = async () => {
    setIsLoading(true);
    setResetMessage('');
    try {
      const response = await fetch(
        'https://yksggzzgvnocuwzmdyda.supabase.co/auth/v1/token?grant_type=password',
        {
          method: 'POST',
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrc2dnenpndm5vY3V3em1keWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDEwNTYsImV4cCI6MjA2MzQxNzA1Nn0.Ulj2yhrvJarDkCEK4zONq2N8z75tyf6ZcRf8K959H3Q',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password: senha }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || 'Erro no login');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('access_token', data.access_token);

      //(data.access_token);
      navigate('/PerfilPage');
    } catch (err: any) {
      toast({
        title: 'Erro no login',
        description: err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenReset = () => {
    setEmailReset('');
    setResetMessage('');
    setIsResetOpen(true);
  };

  const handleCloseReset = () => setIsResetOpen(false);

  const handleResetPassword = async () => {
    if (!emailReset) {
      setResetMessage('Por favor, insira seu email.');
      return;
    }

    setResetLoading(true);
    setResetMessage('');

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setResetMessage('Email de recuperação enviado! Verifique sua caixa de entrada.');
    } catch {
      setResetMessage('Erro ao enviar email. Tente novamente.');
    }

    setResetLoading(false);
  };

  return (
    <Box
      //bgImage={`url(${fundo})`}
      bgSize="cover"
      bgPos="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        w={isMobile ? '100%' : 400}
        bg="rgba(0, 0, 0, 0.7)"
        color="white"
        borderRadius="md"
        p={6}
        boxShadow="lg"
        textAlign="center"
      >
        <Image src={AvaiLogo} alt="Avaí SC" mx="auto" w={20} />
        <Text fontSize="xl" fontWeight="bold" mt={4} mb={6}>
          LOGIN AVAÍ
        </Text>

        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            color="white"
            _placeholder={{ color: 'gray.300' }}
            autoComplete="username"
          />

          <InputGroup>
            <Input
              placeholder="Senha"
              type={showPassword ? 'text' : 'password'}
              value={senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
              bg="rgba(255, 255, 255, 0.1)"
              color="white"
              _placeholder={{ color: 'gray.300' }}
              autoComplete="current-password"
            />
            <InputRightElement>
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: 'transparent' }}
                onClick={() => setShowPassword(!showPassword)}
                size="sm"
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Entrando"
            onClick={handleLogin}
            mt={2}
          >
            ENTRAR
          </Button>

          <Text
            mt={4}
            color="gray.300"
            cursor="pointer"
            textDecoration="underline"
            userSelect="none"
            onClick={handleOpenReset}
          >
            Esqueceu sua senha?
          </Text>

          <Text mt={4}>Ainda não possui conta?</Text>

          <Button
            variant="outline"
            color="white"
            borderColor="white"
            _hover={{ bg: 'whiteAlpha.300' }}
            onClick={() => navigate('/CadastroTorcedorPage')}
          >
            CRIAR MINHA CONTA
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isResetOpen} onClose={handleCloseReset} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.600" textAlign="center" fontWeight="bold">
            Recuperar Senha
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Digite seu email"
              value={emailReset}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailReset(e.target.value)}
              autoFocus
            />
            {resetMessage && (
              <Text
                mt={4}
                color={resetMessage.toLowerCase().includes('erro') ? 'red.500' : 'green.500'}
                textAlign="center"
              >
                {resetMessage}
              </Text>
            )}
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between" gap={2} flexWrap="wrap">
            <Button
              colorScheme="blue"
              onClick={handleResetPassword}
              isLoading={resetLoading}
              flex="1"
            >
              Enviar
            </Button>
            <Button onClick={handleCloseReset} flex="1" variant="outline">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
