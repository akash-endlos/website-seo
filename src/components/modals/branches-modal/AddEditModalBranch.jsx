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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEditModalBranch = ({ isOpen, onClose, onSave, rowData, onEditSave }) => {
  const isEditMode = !!rowData;
  const [formData, setFormData] = useState({});

  const validationSchema = Yup.object().shape({
    webPageUrl: Yup.string().required("Web Page URL is required"),
    headTag: Yup.string().required("Head Tag is required"),
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
        setValue("headTag", rowData.headTag);
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
    // Reset the form values
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? "Edit" : "Add"} Pages</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={errors.webPageUrl}>
              <FormLabel>Web Page URL</FormLabel>
              <Input type="text" name="webPageUrl" {...register("webPageUrl")} />
              <FormErrorMessage>
                {errors.webPageUrl && errors.webPageUrl.message}
              </FormErrorMessage>
            </FormControl>
            {/* <FormControl isInvalid={errors.website}>
              <FormLabel>Website</FormLabel>
              <Input type="text" name="website" {...register("website")} />
              <FormErrorMessage>
                {errors.website && errors.website.message}
              </FormErrorMessage>
            </FormControl> */}
            <FormControl isInvalid={errors.headTag}>
              <FormLabel>Head Tag</FormLabel>
              <Textarea type="text" name="headTag" {...register("headTag")} />
              <FormErrorMessage>
                {errors.headTag && errors.headTag.message}
              </FormErrorMessage>
            </FormControl>
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

export default AddEditModalBranch;
