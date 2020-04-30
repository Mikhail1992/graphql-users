import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS, CREATE_USER, DELETE_USER, UPDATE_USER } from "./queries";
import User from "../User";
import hoc from "./hoc";

const MODAL_EDIT = "MODAL_EDIT";
const MODAL_CREATE = "MODAL_CREATE";

const Users = ({ classes }) => {
  const [modalStatus, setModalStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { data = {} } = useQuery(GET_USERS);

  const [createUser] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.concat([createUser]) },
      });
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: users.reduce((acc, user) => {
            if (user.id === updateUser.id) {
              return [...acc, updateUser];
            }
            return [...acc, user];
          }, []),
        },
      });
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.filter((user) => user.id !== deleteUser.id) },
      });
    },
  });

  const { users } = data;

  const handleEdit = (user) => {
    setModalStatus(MODAL_EDIT);
    setCurrentUser(user);
  };

  const handleUpdate = () => {
    updateUser({ variables: currentUser });
    setModalStatus(null);
  };

  const handleCreate = () => {
    createUser({
      variables: currentUser,
    });
    setModalStatus(null);
  };

  const handleClickModal = () => {
    const fn = modalStatus === MODAL_EDIT ? handleUpdate : handleCreate;
    fn();
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        {users &&
          users.map((user) => (
            <User
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              handleEdit={handleEdit}
            />
          ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => {
              setCurrentUser(null);
              setModalStatus(MODAL_CREATE);
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={!!modalStatus}
        onClose={() => setModalStatus(null)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form className={classes.modal}>
          <TextField
            id="standard-basic"
            label="Name"
            onChange={(e) =>
              setCurrentUser({
                ...(currentUser && currentUser),
                name: e.target.value,
              })
            }
            value={currentUser && currentUser.name}
          />
          <TextField
            id="standard-basic"
            label="Email"
            onChange={(e) =>
              setCurrentUser({
                ...(currentUser && currentUser),
                email: e.target.value,
              })
            }
            value={currentUser && currentUser.email}
          />

          <Button size="medium" onClick={handleClickModal}>
            Save
          </Button>
        </form>
      </Modal>
    </Container>
  );
};

export default hoc(Users);
