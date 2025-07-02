import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Input,
  Checkbox,
  Text,
  Divider,
  useTheme,
  Alert,
  AlertIcon,
  Flex,
  SimpleGrid,
  IconButton,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Logo from '../../assets/logo-avai-256.png';

const CadastroPage: React.FC = () => {
  const theme = useTheme();

  const [tipoCadastro, setTipoCadastro] = useState<'individual' | 'equipe'>('individual');
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alerta, setAlerta] = useState<{ tipo: 'error' | 'success'; mensagem: string } | null>(null);
  const [integrantes, setIntegrantes] = useState<string[]>([]);

  const handleAddIntegrante = () => {
    setIntegrantes((prev) => [...prev, '']);
  };

  const handleRemoveIntegrante = (index: number) => {
    setIntegrantes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeIntegrante = (index: number, value: string) => {
    setIntegrantes((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleSubmit = () => {
    if (!nome || !usuario || !email || !senha || !repetirSenha) {
      setAlerta({ tipo: 'error', mensagem: 'Por favor, preencha todos os campos.' });
      return;
    }
    if (senha !== repetirSenha) {
      setAlerta({ tipo: 'error', mensagem: 'As senhas não coincidem.' });
      return;
    }
    if (!termosAceitos) {
      setAlerta({ tipo: 'error', mensagem: 'Você precisa aceitar os termos.' });
      return;
    }
    if (tipoCadastro === 'equipe' && integrantes.length === 0) {
      setAlerta({ tipo: 'error', mensagem: 'Adicione pelo menos um integrante para grupo.' });
      return;
    }

    setAlerta(null);
    setIsLoading(true);

    // Simula envio
    setTimeout(() => {
      setIsLoading(false);
      setAlerta({ tipo: 'success', mensagem: 'Cadastro realizado com sucesso!' });

      // Reset formulário se quiser:
      // setNome('');
      // setUsuario('');
      // setEmail('');
      // setSenha('');
      // setRepetirSenha('');
      // setTermosAceitos(false);
      // setIntegrantes([]);
      // setTipoCadastro('individual');
    }, 2000);
  };

   return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={5}
      bg="#092b5a"
      width="100vw"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        }}
        style={{ width: '100%' }}
      >
        <Box
          bg={theme.colors?.background?.paper || 'white'}
          borderRadius="lg"
          boxShadow="xl"
          px={{ base: 2, sm: 4 }}
          py={5}
          mx="auto"
          maxWidth={600}
        >
          <Flex justify="center" mb={2}>
            <Image src={Logo} alt="Logo Avaí" boxSize="80px" />
          </Flex>

          <Heading
            as="h4"
            size="lg"
            textAlign="center"
            mb={4}
            fontFamily="'Oswald', sans-serif"
            fontWeight="700"
            color="#003399"
            letterSpacing="1px"
          >
            Cadastro para Campeonato Gamer
          </Heading>

          {alerta && (
            <Alert status={alerta.tipo} mb={4} borderRadius="md">
              <AlertIcon />
              {alerta.mensagem}
            </Alert>
          )}

          <FormControl w="full" my={4}>
            <FormLabel
              mb={1}
              fontWeight="600"
              color={theme.colors?.text?.secondary || 'gray.600'}
              fontSize="md"
            >
              Tipo de Cadastro
            </FormLabel>

            <RadioGroup
              value={tipoCadastro}
              onChange={(value) => setTipoCadastro(value as 'individual' | 'equipe')}
              name="tipo-cadastro"
              display="flex"
              flexDirection="row"
            >
              <Radio value="individual" colorScheme="blue" mr={4}>
                Individual
              </Radio>
              <Radio value="equipe" colorScheme="blue">
                Grupo
              </Radio>
            </RadioGroup>
          </FormControl>

          <FormControl isRequired mb={3}>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={3}>
            <FormLabel>Usuário</FormLabel>
            <Input
              type="text"
              placeholder="Nome de usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={3}>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
            <FormControl isRequired>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Repetir Senha</FormLabel>
              <Input
                type="password"
                placeholder="Repita a senha"
                value={repetirSenha}
                onChange={(e) => setRepetirSenha(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>

          {tipoCadastro === 'equipe' && (
            <Box mb={4}>
              <Text fontWeight="600" mb={2}>
                Integrantes do Grupo
              </Text>

              {integrantes.map((nomeIntegrante, index) => (
                <Flex key={index} align="center" mb={2}>
                  <Input
                    placeholder={`Nome do integrante ${index + 1}`}
                    value={nomeIntegrante}
                    onChange={(e) => handleChangeIntegrante(index, e.target.value)}
                  />
                  <IconButton
                    aria-label="Remover integrante"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    ml={2}
                    onClick={() => handleRemoveIntegrante(index)}
                  />
                </Flex>
              ))}

              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                size="sm"
                onClick={handleAddIntegrante}
              >
                Adicionar Integrante
              </Button>
            </Box>
          )}

          <Checkbox
            isChecked={termosAceitos}
            onChange={(e) => setTermosAceitos(e.target.checked)}
            mb={4}
          >
            Aceito os termos e condições
          </Checkbox>

          <Divider mb={4} />

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Enviando"
          >
            Cadastrar
          </Button>

          <Modal isOpen={isLoading} onClose={() => {}} isCentered>
            <ModalOverlay />
            <ModalContent
              bg="transparent"
              boxShadow="none"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              pointerEvents="none"
            >
              <Image
                src={Logo}
                alt="Logo Avaí"
                boxSize="100px"
                sx={{ animation: 'spin 1.5s linear infinite' }}
              />
            </ModalContent>
          </Modal>
        </Box>
      </motion.div>
    </Box>
  );
};

export default CadastroPage;
