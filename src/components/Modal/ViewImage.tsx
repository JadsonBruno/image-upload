import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent alignSelf="center" mw={900} mh={600}>
        <ModalBody p={0}>
          <Image src={imgUrl} alt={imgUrl} objectFit="fill" />
        </ModalBody>
        <ModalFooter
          borderRadius="0px 0px 6px 6px"
          p="8px"
          h="32px"
          w="100%"
          justifyContent="flex-start"
          bg="pGray.800"
        >
          <Link fontSize="14px" color="pGray.50" href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
