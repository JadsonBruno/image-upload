import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import axios from 'axios';
import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  // const formValidations = {
  //   image: {
  //     // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
  //   },
  //   title: {
  //     // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
  //   },
  //   description: {
  //     // TODO REQUIRED, MAX LENGTH VALIDATIONS
  //   },
  // };

  const queryClient = useQueryClient();
  const mutation = useMutation(async data => axios.post('/api/images', data), {
    onSuccess: () => queryClient.invalidateQueries('images'),
  });

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await mutation.mutateAsync({ ...data, url: imageUrl });
    } catch {
      toast({
        title: 'Ops',
        status: 'error',
        description:
          'Ocorreu um problema durante o upload. Tente novamente mais tarde.',
      });
    } finally {
      closeModal();
      reset();
      setImageUrl('');
      setLocalImageUrl('');
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', { required: true, maxLength: 10 })}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', {
            required: true,
            maxLength: 30,
            minLength: 10,
          })}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', { required: true, maxLength: 100 })}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
