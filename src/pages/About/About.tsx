import { Heading, Text } from "@chakra-ui/react";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const About = () => {
 return (
    <SectionContainer title="Sobre" flexDirection="column">
      <Text>
        A <strong>BARUCH Turismo</strong> é uma empresa manauara especializada em criar experiências únicas e memoráveis na Amazônia. Atuando nas cidades de <strong>Manaus</strong> e <strong>Parintins</strong>, nossa missão é conectar viajantes do Brasil e do mundo à riqueza natural, cultural e histórica do coração da floresta amazônica.
      </Text>

      <br />

      <Text>
        Mais do que um passeio, oferecemos vivências. Desde os rios misteriosos e a imensidão da selva até o calor humano das comunidades ribeirinhas e a força da cultura regional — cada roteiro é pensado com carinho, responsabilidade e autenticidade.
      </Text>

      <br />

      <Text>
        Em <strong>Manaus</strong>, conduzimos você pelos principais atrativos urbanos e naturais da capital amazônica: o famoso Encontro das Águas, o Teatro Amazonas, mercados típicos, florestas de igapó e passeios de barco inesquecíveis.
      </Text>

      <br />

      <Text>
        Em <strong>Parintins</strong>, berço do tradicional Festival Folclórico, levamos você a mergulhar na alma do povo amazônico, vivenciar de perto a magia dos bois-bumbás Garantido e Caprichoso, e conhecer a hospitalidade vibrante da ilha.
      </Text>

      <br />

      <Text>
        Comprometida com o turismo sustentável e o respeito às comunidades locais, a BARUCH atua com guias capacitados, parcerias regionais e foco na preservação ambiental.
      </Text>

      <br />

      <Heading size="md" color="green.700">VIAJAR COM A BARUCH É DESCOBRIR A AMAZÔNIA DE VERDADE.</Heading>
    </SectionContainer>
  );
};

export default About;
