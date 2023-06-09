import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import DynamicTable from "@/features/table/DynamicTable";
import Layout from "@/layout/Layout";
import DeleteModal from "@/components/modals/customer-modal/DeleteModalCustomer";
import { useAddCustomerMutation, useDeleteCustomerMutation, useGetCustomerByIdMutation, useGetCustomersMutation, useGetCustomersQuery,  useUpdateCustomerMutation } from "@/redux/feature/customerApiSlice";
import { BiDotsVerticalRounded } from "react-icons/bi";
import AddEditModal from "@/components/modals/customer-modal/AddEditModalCustomer";
import { useRouter } from "next/router";
import { useAddWebsiteMutation, useGetWebsiteQuery, useUpdateWebsiteMutation } from "@/redux/feature/websiteApiSlice";
import { toast } from "react-hot-toast";

const index = () => {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const headers = ["name", "Action"];
  const [addWebsite] = useAddWebsiteMutation();
  const { data: website,refetch } = useGetWebsiteQuery();
  const [updateWebsite] = useUpdateWebsiteMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()
  useEffect(() => {
   if(website)
   {
       setDataTable(website.data.WebDetails)
       refetch();
   }
  }, [website])
  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCustomer(selectedRow._id)
      .unwrap()
      .then(() => {
        setSelectedRow(null); // Reset selectedRow state
        setIsDeleteModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleCancelDelete = () => {
    setSelectedRow(null);
    setIsDeleteModalOpen(false);
  };

  const handleAddEdit = (row) => {
    setSelectedRow(row);
    setIsAddEditModalOpen(true);
  };

  const handleSave = async(data) => {
    await addWebsite(data)
    .unwrap()
    .then(() => {
      setaddTutorialData({ name: ""});
    })
    .catch((error) => {
      toast.error(error.data.error)

    });
  };
  
  const handleEditSave=async(data)=>{
    const updatedData={
      id: selectedRow._id,
      editedData:data
    }
    await updateWebsite(updatedData)
    .unwrap()
    .then(() => {
      setaddTutorialData({ name: ""});
    })
    .catch((error) => {
    console.log(error);

    });
  }
  const handleCancelAddEdit = () => {
    setSelectedRow(null);
    setIsAddEditModalOpen(false);
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setIsViewModalOpen(true);
  };


  const handleViewDrawerClose = () => {
    setSelectedRow(null);
    setIsViewModalOpen(false);
  };
  const renderAction = (row) => {
    return (
      <Menu>
        <MenuButton variant="outline">
          <BiDotsVerticalRounded size={25} />
        </MenuButton>
        <MenuList className=" text-white rounded-md p-1">
          <MenuItem
            className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
            onClick={() => router.push(`customer/branches/${row._id}`)}
          >
            View 
          </MenuItem>
          <MenuItem
            className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
            onClick={() => handleAddEdit(row)}
          >
            Edit Website
          </MenuItem>
          {/* <MenuItem
            className="text-center px-5 py-2 border rounded-md bg-black text-white hover:bg-white hover:text-black"
            onClick={() => handleDelete(row)}
          >
            Delete Customer
          </MenuItem> */}
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Layout>
        <Text color="teal" fontSize="3xl" className="font-bold px-5 py-5">
          Websites
        </Text>
        <Flex px={5} alignContent="center" justifyContent="space-between">
          <Box>Search</Box>
          <Box>
            <Button colorScheme="teal" onClick={() => setIsAddEditModalOpen(true)}>
              Add Website
            </Button>
          </Box>
        </Flex>
        <DynamicTable
          headerNames={headers}
          data={dataTable}
          renderAction={renderAction}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <AddEditModal
          isOpen={isAddEditModalOpen}
          onClose={handleCancelAddEdit}
          onSave={handleSave}
          onEditSave={handleEditSave}
          rowData={selectedRow}
        />
      </Layout>
    </>
  );
};

export default index;
