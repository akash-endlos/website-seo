import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditModalBranch = ({ isOpen, onClose, onSave, rowData, onEditSave }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    webPageUrl: Yup.string().required("Web Page URL is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    keywords: Yup.string().required("Keywords are required"),
    ogTitle: Yup.string().required("Open Graph Title is required"),
    ogDescription: Yup.string().required("Open Graph Description is required"),
    ogImageUrl: Yup.string().required("Open Graph Image URL is required"),
    twitterTitle: Yup.string().required("Twitter Title is required"),
    twitterDescription: Yup.string().required("Twitter Description is required"),
    twitterImage: Yup.string().required("Twitter Image URL is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (isEditMode) {
      setFormData(rowData);
    } else {
      setFormData({});
    }
  }, [rowData]);

  useEffect(() => {
    if (isOpen) {
      reset();
      if (isEditMode) {
        setValue("webPageUrl", rowData.webPageUrl);
        setValue("title", rowData.title);
        setValue("description", rowData.description);
        setValue("keywords", rowData.keywords);
        setValue("ogTitle", rowData.ogTitle);
        setValue("ogDescription", rowData.ogDescription);
        setValue("ogImageUrl", rowData.ogImageUrl);
        setValue("twitterTitle", rowData.twitterTitle);
        setValue("twitterDescription", rowData.twitterDescription);
        setValue("twitterImage", rowData.twitterImage);
      }
    }
  }, [isOpen, isEditMode, rowData, reset, setValue]);

  const onSubmit = (data) => {
    if (isEditMode) {
      onEditSave(data);
      onClose();
      reset();
    } else {
      onSave(data);
      onClose();
      reset();
    }
  };

  return (
    <Modal size='5xl' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Pages</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Flex direction="row">
              <FormControl isInvalid={errors.webPageUrl} flex="1" marginRight="2">
                <FormLabel>Web Page URL</FormLabel>
                <Input type="text" name="webPageUrl" {...register("webPageUrl")} />
                <FormErrorMessage>
                  {errors.webPageUrl && errors.webPageUrl.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.title} flex="1" marginLeft="2">
                <FormLabel>Title</FormLabel>
                <Input type="text" name="title" {...register("title")} />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex direction="row">
              <FormControl isInvalid={errors.description} flex="1" marginRight="2">
                <FormLabel>Description</FormLabel>
                <Textarea type="text" name="description" {...register("description")} />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.keywords} flex="1" marginLeft="2">
                <FormLabel>Keywords</FormLabel>
                <Input type="text" name="keywords" {...register("keywords")} />
                <FormErrorMessage>
                  {errors.keywords && errors.keywords.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex direction="row">
              <FormControl isInvalid={errors.ogTitle} flex="1" marginRight="2">
                <FormLabel>Open Graph Title</FormLabel>
                <Input type="text" name="ogTitle" {...register("ogTitle")} />
                <FormErrorMessage>
                  {errors.ogTitle && errors.ogTitle.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.ogDescription} flex="1" marginLeft="2">
                <FormLabel>Open Graph Description</FormLabel>
                <Textarea
                  type="text"
                  name="ogDescription"
                  {...register("ogDescription")}
                />
                <FormErrorMessage>
                  {errors.ogDescription && errors.ogDescription.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex direction="row">
              <FormControl isInvalid={errors.ogImageUrl} flex="1" marginRight="2">
                <FormLabel>Open Graph Image URL</FormLabel>
                <Input type="text" name="ogImageUrl" {...register("ogImageUrl")} />
                <FormErrorMessage>
                  {errors.ogImageUrl && errors.ogImageUrl.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.twitterTitle} flex="1" marginLeft="2">
                <FormLabel>Twitter Title</FormLabel>
                <Input type="text" name="twitterTitle" {...register("twitterTitle")} />
                <FormErrorMessage>
                  {errors.twitterTitle && errors.twitterTitle.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex direction="row">
              <FormControl isInvalid={errors.twitterDescription} flex="1" marginRight="2">
                <FormLabel>Twitter Description</FormLabel>
                <Textarea
                  type="text"
                  name="twitterDescription"
                  {...register("twitterDescription")}
                />
                <FormErrorMessage>
                  {errors.twitterDescription && errors.twitterDescription.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.twitterImage} flex="1" marginLeft="2">
                <FormLabel>Twitter Image URL</FormLabel>
                <Input type="text" name="twitterImage" {...register("twitterImage")} />
                <FormErrorMessage>
                  {errors.twitterImage && errors.twitterImage.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue" ml={3}>
              {isEditMode ? "Update" : "Save"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditModalBranch
